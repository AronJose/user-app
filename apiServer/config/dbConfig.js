var Sequelize = require('sequelize')
require('dotenv').config();
const DB_NAME = process.env.db;
const DB_USERNAME = process.env.username;
const DB_PASSWORD = process.env.password;
console.log(DB_PASSWORD, DB_USERNAME, DB_NAME,"checking")
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize