const Sequelize = require('sequelize');
require('dotenv').config({path:__dirname+'/./../../.env'})

const sqlDB = process.env.SQLDB;
const sqlUser = process.env.SQLUSER;
const sqlPassword = process.env.SQLPASS;

const sequelize = new Sequelize(sqlDB, sqlUser, sqlPassword, {
    host: 'localhost',
    dialect: 'mariadb',
});

module.exports = sequelize