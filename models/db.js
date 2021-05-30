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
db.gadget = require("./gadget.models.js")(sequelize, Sequelize);
db.like = require("./likes.models.js")(sequelize, Sequelize);
db.tags = require("./tags.models.js")(sequelize, Sequelize);
db.comment = require("./comment.models.js")(sequelize, Sequelize);


db.user.belongsToMany(db.comment,{
    through: db.comment
});
db.user.belongsToMany(db.tags,{
    through: db.tags
});

/*db.user.belongsToMany(db.like,{
    through: db.like
});*/

module.exports = db;