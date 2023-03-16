const Sequelize = require('sequelize');
require('dotenv').config({path:__dirname+'/./../../.env'})

const sqlDB = process.env.SQLDB;
const sqlUser = process.env.SQLUSER;
const sqlPassword = process.env.SQLPASS;
const sqlHost = process.env.SQLHOST;
console.log({
    db : sqlDB,
    user: sqlUser,
    pass : sqlPassword,
    host : sqlHost
})

const sequelize = new Sequelize(sqlDB, sqlUser, sqlPassword, {
    host: sqlHost,
    dialect: 'mariadb',
});

module.exports = sequelize;