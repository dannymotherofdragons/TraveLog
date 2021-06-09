module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("comments", {
        commentID: {   // Identifier of each comment
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentDescription: { // The comment itself
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return comments;
}