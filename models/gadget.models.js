module.exports = (sequelize, DataTypes) => {
    const gadget = sequelize.define("gadget", {
        gadgetID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gadgetName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        like: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'likes.models',
                key: 'likeID'
            }
        }
    });

    return gadget;
};