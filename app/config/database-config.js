const Sequelize = require('sequelize');
require('dotenv').config({path:__dirname+'/./../../.env'})

const sequelize = new Sequelize(process.env.SQLDB, process.env.SQLUSER, process.env.SQLPASS, {
    host: process.env.SQLHOST,
    dialect: 'mariadb',
})

module.exports = sequelize