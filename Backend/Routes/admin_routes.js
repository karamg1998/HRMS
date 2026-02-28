const express = require("express");
const controller = require("../Controllers/admin_controller")
const Router = express.Router();


// To create Employee
Router.post("/admin/employees/create", controller.createEmployee);

// To get all employees
Router.get("/admin/employees/get", controller.getEmployees);

// To delete targetted employee
Router.delete("/admin/employees/delete/:id", controller.deleteEmployee);

// For dashboard like total employees, total present and total absent
Router.get("/admin/dashboard",controller.getDashboardSummary);

// Filter employee by date
Router.get("/admin/filter/date/:employeeId",controller.getFilteredAttendance);

// mark employee present and absent
Router.post("/admin/attendance", controller.markAttendance);

// Get deatils of particular employee
Router.get("/admin/attendance/get/:employeeId", controller.getAttendanceByEmployee);



module.exports = Router;