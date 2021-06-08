module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("comment", {
        commentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentText:{
            type: DataTypes.STRING,
            allowNull: false
        },
        userWhoPosted:{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'users',
                key: 'userID'
            }
        }
    });

    return comment;
}