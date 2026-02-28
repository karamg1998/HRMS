import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeTable from "../components/EmployeeTable";
import toast from "react-hot-toast";

function Home() {
    const [dashboardData, setDashboardData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`http://16.171.174.44:3000/admin/employees/get`);
            if (res.data.success) {
                setEmployees(res.data.data);
            }
            else {
                toast.error(res.data.msg);
            }
        }
        catch (err) {
            toast.error("something went worng please refresh the page in d")
        }

    };

    const fetchDashboard = async () => {
        try {
            const res = await axios.get(`http://16.171.174.44:3000/admin/dashboard`);
            if (res.data.success) {
                setDashboardData(res.data.data);
            }
            else {
                toast.error(res.data.msg);
            }

        }
        catch (err) {
            toast.error("something went worng please refresh the page")
        }

    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                await Promise.all([fetchDashboard(), fetchEmployees()]);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>HRMS LITE</h1>

            {dashboardData && <Dashboard data={dashboardData} />}

            <button onClick={() => setShowModal(true)}>+ Add Employee</button>

            {showModal && (
                <AddEmployeeModal
                    close={() => setShowModal(false)}
                    refreshDashboard={fetchDashboard}
                    refreshEmployees = {fetchEmployees}
                />
            )}

            <EmployeeTable employees={employees} reload={fetchEmployees} seondReload={fetchDashboard} />
        </div>
    );
}

export default Home;