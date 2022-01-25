const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND3', 'joaoferr_SIC_21_22_IND3', 'KLc9NMfmJvdDvMtT', {
  host: 'www.joaoferreira.eu',
  dialect: 'mysql'
})

class Repost extends Model {}

Repost.init({
    postID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    repostContent: DataTypes.BLOB,
    repostText: DataTypes.STRING,
    likes: DataTypes.INTEGER
}, { sequelize, modelName: 'repost'})

sequelize.sync().then().catch(error => {
    console.log("Error: " + error + " SYNC USER MODELS");
})

exports.Repost = Repost;