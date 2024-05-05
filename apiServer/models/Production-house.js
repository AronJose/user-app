
var sequelize = require('../config/dbConfig')
let Sequelize = require('sequelize');
let users = require('./Users')

const production_houses = sequelize.define('production_houses', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
    },
    production_house_name: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    production_house_image: {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, { freezeTableName: true });
production_houses.sync().then(() => {
    console.log('Production House Table created successfully');
}).catch((error) => {
    console.error('Error creating table:', error);
});
users.hasMany(production_houses, { foreignKey: 'user_id' });
production_houses.belongsTo(users, { foreignKey: 'user_id' });

module.exports = production_houses;