import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EmployeeTable({ employees, reload, seondReload }) {
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?"))
            return;
        try {
            let del = await axios.delete(`http://16.171.174.44:3000/admin/employees/delete/${id}`);
            if (del.data.success) {
                toast.success(del.data.msg);
                reload();
                seondReload();
            }
            else {
                toast.error(del.data.msg);
            }
        }
        catch (err) {
            console.log(err)
            toast.error("something went worng please refresh the page in this")
        }
    };

    const markAttendance = async (id, status) => {
        try {
            let mark = await axios.post(`http://16.171.174.44:3000/admin/attendance`, {
                employeeId: id,
                attendance_date: today,
                status: status
            });
            if (mark.data.success) {
                toast.success(mark.data.msg);
                reload();
            }
            else {
                toast.error(mark.data.msg);
            }
        }
        catch (err) {
            toast.error("something went worng please refresh the page")
        }
    };

    return (
        <>
            <h2>Employees</h2>

            {employees.length === 0 && <p>No employees found</p>}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.full_name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.total_present || 0}</td>
                            <td>{emp.total_absent || 0}</td>

                            <td style={{ textAlign: "right" }}>
                                <button style={{ background: "#2563eb" }}
                                    onClick={() => navigate(`/details/${emp.id}`)}>
                                    Info
                                </button>

                                <button
                                    style={{ background: "#16a34a" }}
                                    onClick={() => markAttendance(emp.id, "present")}
                                >
                                    Present
                                </button>

                                <button
                                    style={{ background: "#dc2626" }}
                                    onClick={() => markAttendance(emp.id, "absent")}
                                >
                                    Absent
                                </button>

                                <button
                                    style={{ background: "#6b7280" }}
                                    onClick={() => handleDelete(emp.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default EmployeeTable;