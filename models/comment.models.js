module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("comments", {
        commentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentText: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return comments;
}