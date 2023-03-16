const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require("../config/database-config.js");

sequelize.drop({ match: /_test$/ });