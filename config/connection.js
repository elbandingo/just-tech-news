//import Sequalize constructor from the library
const Sequelize = require("sequelize");
//require the dotenv configuration
require('dotenv').config();

//create the connection to the database passing in login information as an object
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;