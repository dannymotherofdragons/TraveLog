module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("comment", {
        commentID: {
            primaryKey: true,
            type: DataTypes.STRING
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