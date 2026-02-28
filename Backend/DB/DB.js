const sequelize = require("sequelize")

const Sequelize = new sequelize(process.env.DB_TABLE_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:"mysql",
    host:"localhost"
});

module.exports = Sequelize;