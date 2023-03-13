const Sequelize = require('sequelize');
require('dotenv').config({path:__dirname+'/./../../.env'})

const sqlDB = process.env.SQLDB;
const sqlUser = process.env.SQLUSER;
const sqlPassword = process.env.SQLPASS;
const sqlHost = process.env.SQLHOST;

const sequelize = new Sequelize(sqlDB, sqlUser, sqlPassword, {
    host: sqlHost,
    dialect: 'mariadb',
});

/*sequelize.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection error');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused')
        }
    }
    if (connection) connection.release();
    return;
})
*/

module.exports = sequelize;