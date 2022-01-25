const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND3', 'joaoferr_SIC_21_22_IND3', 'KLc9NMfmJvdDvMtT', {
  host: 'www.joaoferreira.eu',
  dialect: 'mysql'
})

class Posts extends Model {}

Posts.init({
    userID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    postContent: DataTypes.BLOB,
    postText: DataTypes.STRING,
    likes: DataTypes.INTEGER    
}, { sequelize, modelName: 'posts'})

sequelize.sync().then().catch(error => {
    console.log("Error: " + error + " SYNC POST MODELS");
})

exports.Posts = Posts;
