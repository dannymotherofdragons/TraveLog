const dbConfig = require('../config/db.config.js'); // gets DB credentials
const user = require('./users.models.js');
// Call sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    db: dbConfig.DB,
    dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./users.models.js")(sequelize, Sequelize);

db.user({foreignKey: 'idUser'});

module.exports = db;