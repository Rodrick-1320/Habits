const Sequelize = require('sequelize')
const db = require('./db')

const usersDb = db.define('users', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    birth: {
        type:Sequelize.DATEONLY,
        allowNull: false,
    }
})

module.exports = {
    usersDb
}