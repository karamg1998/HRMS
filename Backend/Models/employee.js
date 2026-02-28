const sequelize = require("sequelize");
const Sequelize = require("../DB/DB");

const Employees = Sequelize.define("employees", {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize.STRING(100),
        unique:true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    department: {
        type: sequelize.STRING(100),
        allowNull: false,
    }
}, {
    tableName: "employees",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

module.exports = Employees;