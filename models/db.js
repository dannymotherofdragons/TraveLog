const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

sequelize.authenticate()
    .then(() => {
        console.log("Conectou a base de dados!");
    })
    .catch(err => {
        console.error("Nao Conectou a base de dados!", err);
    });

const db = {};
db.sequelize = sequelize; //export the Sequelize instance (actual connection pool)

db.user = require("./user.model.js");
db.post = require("./post.model.js");
db.comment = require("./comment.model.js");
db.repost = require("./repost.model.js");

/*
db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

db.user.hasMany(db.repost);
db.repost.belongsTo(db.user);

db.post.hasMany(db.comment);
db.comment.belongsTo(db.comment);

db.repost.hasMany(db.comment);
db.comment.belongsTo(db.repost);

db.comment.hasMany(db.comment);
*/
db.sequelize.sync()
    .then(() => {
        console.log("A base de dados foi sincronizada com sucesso.");
    })
    .catch(e => {
        console.log(e);
    });

module.exports = db;
    