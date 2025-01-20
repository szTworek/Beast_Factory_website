const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './users.db',
    dialectOptions: {
        useUTC: false,
    },
    logging: console.log,
});

const Account = sequelize.define('Account', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


sequelize.sync().then(() => console.log('Database synced'));
module.exports = { sequelize,Account };