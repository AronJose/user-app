var sequelize = require('../config/dbConfig')
let Sequelize = require('sequelize');
let roles = require("../models/Roles")

// -----------------------------  created table fiels names and features -------------------------------------

const users = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
       
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password_salt: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive', 'trash'),
        defaultValue: 'active',
        allowNull: true,
    },
    role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    image_url: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
    verify: {
        type: Sequelize.ENUM('true','false'),
        defaultValue: 'false',
    },
    social_id: {
        type: Sequelize.STRING
    },
}, { freezeTableName: true });
users.sync().then(() => {
    console.log('Table created successfully');
}).catch((error) => {
    console.error('Error creating table:', error);
});
roles.hasMany(users, { foreignKey: 'role_id' });
users.belongsTo(roles, { foreignKey: 'role_id' });

module.exports = users;