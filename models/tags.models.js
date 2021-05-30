module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define("tag",{
        tagID:{
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        tagText:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return tag;
}