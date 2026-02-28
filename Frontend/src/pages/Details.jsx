import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Initial Fetch (Employee + Full Attendance)
  const fetchDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://16.171.174.44:3000/admin/attendance/get/${id}`
      );

      if (res.data.success) {
        setEmployee(res.data.data[0]);
        setAttendance(res.data.attendance_data);
      } else {
        toast.error(res.data.msg || "Employee not found");
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  // Filter Only Attendance (Do NOT reset employee info)
  const handleFilter = async () => {
    if (!from || !to) {
      toast.error("Please select both dates");
      return;
    }

    if (from > to) {
      toast.error("From date cannot be greater than To date");
      return;
    }

    try {
      setFilterLoading(true);

      const res = await axios.get(
        `http://16.171.174.44:3000/admin/filter/date/${id}?from=${from}&to=${to}`
      );
 
      if (res.data.success) {
        setAttendance(res.data.data);
      } else {
        toast.error("No data found for selected range");
        setAttendance([]);
      }
    } catch (err) {
      toast.error("Filter failed");
    } finally {
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  // Full Page Loader (Only for initial load)
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>⬅ Back</button>

      {/* Employee Info Card */}
      <div className="details-card">
        <h2>{employee.name}</h2>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>

        <div className="summary-box">
          <div>
            <h4>Total Present</h4>
            <p>{employee.total_present}</p>
          </div>

          <div>
            <h4>Total Absent</h4>
            <p>{employee.total_absent}</p>
          </div>
        </div>
      </div>

      {/* Attendance Section */}
      <h3>Attendance History</h3>

      {/* Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button
          onClick={handleFilter}
          style={{ marginLeft: "10px" }}
        >
          Search
        </button>

        <button
          onClick={fetchDetails}
          style={{ marginLeft: "10px", background: "#6b7280" }}
        >
          Reset
        </button>
      </div>

      {/*  Filter Loading Only for Table */}
      {filterLoading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div className="spinner"></div>
        </div>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((row, index) => (
              <tr key={index}>
                <td>{row.attendance_date}</td>
                <td
                  style={{
                    color: row.status === "present" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Details;