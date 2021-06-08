const dbConfig = require('../config/db.config.js'); // gets DB credentials

// Call sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    db: dbConfig.DB,
    dialect: dbConfig.dialect,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.models.js")(sequelize, Sequelize);
db.gadget = require("./gadget.models.js")(sequelize, Sequelize);
db.likes = require("./likes.models.js")(sequelize, Sequelize);
db.tags = require("./tags.models.js")(sequelize, Sequelize);
db.comment = require("./comment.models.js")(sequelize, Sequelize);
db.subject = require("./subject.models.js")(sequelize, Sequelize);


db.user.belongsToMany(db.comment, {
    through: db.comment
});
db.user.belongsToMany(db.tags, {
    through: db.tags
});

db.user.belongsToMany(db.likes, {
    through: db.likes
});

/*db.user.belongsToMany(db.userType, {
    through: db.userType
});*/

module.exports = db;