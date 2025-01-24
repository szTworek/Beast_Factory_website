const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});


const Items = sequelize.define("Items", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.INTEGER,
    },
    discountPercentage: {
        type: Sequelize.INTEGER,
    },
    stock: {
        type: Sequelize.INTEGER,
    },
    brand: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.BLOB,
    }

 });

 sequelize.sync().then(() => console.log('Database synced'));

 module.exports = { sequelize, Items};