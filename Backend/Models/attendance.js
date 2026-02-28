const sequelize = require("sequelize");
const Sequelize = require("../DB/DB");
const Employee = require("./employee");

const Attendance = Sequelize.define("Attendance", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  attendance_date: {
    type: sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: sequelize.ENUM("present", "absent"),
    allowNull: false,
  },
}, {
  tableName: "attendance",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Attendance;