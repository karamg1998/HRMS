const db = require('../DB/DB');
const { getCurrentMySQLTime, is_email_valid } = require("../Helpers/Helpers")

exports.createEmployee = async (req, res) => {
    let { full_name, email, department } = req.body;

    if (!full_name || !email || !department) {
        return res.status(400).json({ success: false, msg: "Full name, email and department are required." });
    }

    if (!is_email_valid(email)) {
        return res.status(400).json({
            success: false,
            msg: "Invalid email format."
        });
    }

    try {
        let [data] = await db.query("insert into employees (full_name,email,department,created_at,updated_at) values(?,?,?,?,?)", {
            replacements: [full_name, email, department, getCurrentMySQLTime(), getCurrentMySQLTime()]
        });
        return res.status(201).json({ success: true, msg: "employee created successfully" });
    }
    catch (err) {
        console.log(err)
        // Duplicate email handling (MySQL error code)
        if (err.original?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                msg: "Employee with this email already exists."
            });
        }

        return res.status(500).json({
            success: false,
            msg: "Internal server error."
        });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const [employees] = await db.query(
            `SELECT  e.id, e.full_name, e.email,SUM(a.status = 'Present') AS total_present,SUM(a.status = 'Absent') AS total_absent FROM employees e
             LEFT JOIN attendance a ON e.id = a.employeeId GROUP BY e.id, e.full_name, e.email`
        );

        return res.status(200).json({
            success: true,
            data: employees
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    let id = req.params.id;
    try {
        const [result] = await db.query(
            "DELETE FROM employees WHERE id = ?",
            { replacements: [id] }
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found."
            });
        }

        return res.status(200).json({
            success: true,
            msg: "employee record deleted"
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

exports.markAttendance = async (req, res) => {
    const { employeeId, attendance_date, status } = req.body;

    // Validation
    if (!employeeId || !attendance_date || !status) {
        return res.status(400).json({
            success: false,
            msg: "employeeId, attendance_date and status are required."
        });
    }

    if (!["present", "absent"].includes(status.toLowerCase())) {
        return res.status(400).json({
            success: false,
            msg: "Status must be 'Present' or 'Absent'."
        });
    }

    try {
        // Check employee exists
        const [employee] = await db.query(
            "SELECT id FROM employees WHERE id = ?",
            { replacements: [employeeId] }
        );

        if (employee.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found."
            });
        }

        const [attendance] = await db.query("select * from attendance where employeeId = ? AND attendance_date = ?",
            { replacements: [employeeId, attendance_date] });

        if (attendance.length === 0) {
            await db.query(
                `INSERT INTO attendance (employeeId, attendance_date, status,created_at,updated_at)
             VALUES (?, ?, ?, ?, ?)`,
                {
                    replacements: [employeeId, attendance_date, status.toLowerCase(), getCurrentMySQLTime(), getCurrentMySQLTime()]
                }
            );
        }
        else {
            await db.query(`update attendance set status = ? where employeeId = ? AND attendance_date = ?`, { replacements: [status.toLowerCase(), employeeId, attendance_date] })
        }

        return res.status(200).json({
            success: true,
            msg: "Attendance saved successfully."
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error."
        });
    }
};

exports.getAttendanceByEmployee = async (req, res) => {
    const { employeeId } = req.params;

    if (!employeeId) {
        return res.status(400).json({
            success: false,
            msg: "employeeId is required."
        });
    }

    try {
        const [summaryData] = await db.query(
            `SELECT 
                e.id as id,
                e.full_name as name,
                e.email as email,
                e.department as department,
                COALESCE(SUM(a.status = 'present'), 0) AS total_present,
                COALESCE(SUM(a.status = 'absent'), 0) AS total_absent
             FROM employees e
             LEFT JOIN attendance a 
                ON e.id = a.employeeId
             WHERE e.id = ? group by e.id`,
            { replacements: [employeeId] }
        );

        if (summaryData.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found."
            });
        }

        const [attendance_data] = await db.query(`select attendance_date,status from attendance where employeeId = ?`, { replacements: [employeeId] })


        return res.status(200).json({
            success: true,
            data: summaryData,
            attendance_data: attendance_data
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error."
        });
    }
};

exports.getFilteredAttendance = async (req, res) => {
    const { employeeId } = req.params;
    const { from, to } = req.query;
    console.log(from, to)

    if (!employeeId) {
        return res.status(400).json({
            success: false,
            msg: "employeeId is required."
        });
    }

    try {
        // Check employee exists
        const [employee] = await db.query(
            "SELECT id FROM employees WHERE id = ?",
            { replacements: [employeeId] }
        );

        if (employee.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found."
            });
        }

        let [attendance] = await db.query(`SELECT a.attendance_date, a.status FROM employees e 
                                           LEFT JOIN attendance a ON e.id = a.employeeId WHERE e.id = ? AND a.attendance_date BETWEEN ? AND ?
                                           ORDER BY e.id, a.attendance_date DESC;`,
            { replacements: [employeeId, from, to] }
        );

        return res.status(200).json({
            success: true,
            data: attendance
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

exports.getDashboardSummary = async (req, res) => {
    try {

        const [totalEmployees] = await db.query(
            "SELECT COUNT(*) as total FROM employees"
        );

        const [todayAttendance] = await db.query(
            `SELECT 
                COALESCE(SUM(status = 'present'), 0) AS present_today,
                COALESCE(SUM(status = 'absent'), 0) AS absent_today
             FROM attendance
             WHERE attendance_date = CURDATE()`
        );

        return res.status(200).json({
            success: true,
            data: {
                total_employees: totalEmployees[0].total,
                present_today: todayAttendance[0].present_today,
                absent_today: todayAttendance[0].absent_today
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};