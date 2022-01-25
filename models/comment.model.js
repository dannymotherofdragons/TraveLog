/*module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("comments", {
        commentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        commentContent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return comment;
};*/

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND3', 'joaoferr_SIC_21_22_IND3', 'KLc9NMfmJvdDvMtT', {
  host: 'www.joaoferreira.eu',
  dialect: 'mysql'
})

class Comments extends Model {}

Comments.init({
    userID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    postID: DataTypes.INTEGER,
    commentContent: DataTypes.STRING
}, { sequelize, modelName: 'comments'})

sequelize.sync().then().catch(error => {
    console.log("Error: " + error + " SYNC COMMENT MODELS");
})

exports.Comments = Comments;