const Sequelize = require('sequelize')
const db = require('./db');
const { usersDb } = require('./users');

const habitsDb = db.define('habits', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    question: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    definition: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    qtd: {
        type:Sequelize.INTEGER,
        allowNull: false,
    }
})

habitsDb.belongsTo(usersDb);

// habitsDb.sync();

module.exports = {
    habitsDb
}
