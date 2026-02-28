require("dotenv").config();
const express = require("express");
const admin_routes = require("./Routes/admin_routes");
const employees = require("./Models/employee");
const attendance = require("./Models/attendance");
const sequelize = require("./DB/DB");
const cors = require("cors");
const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(admin_routes);

employees.hasMany(attendance, {
    foreignKey: "employeeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

attendance.belongsTo(employees, {
    foreignKey: "employeeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

app.listen(port,()=>{
    console.log("listening at port ",port);
  sequelize.sync();
});