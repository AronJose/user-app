
var sequelize = require('../config/dbConfig')
let Sequelize = require('sequelize');

const roles = sequelize.define('roles', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
    },
    role_name: {
        allowNull: false,
        type: Sequelize.STRING,
    },


}, { freezeTableName: true });
roles.sync().then(() => {
    console.log('Role Table created successfully');
}).catch((error) => {
    console.error('Error creating table:', error);
});

module.exports = roles;