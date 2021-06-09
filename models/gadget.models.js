module.exports = (sequelize, DataTypes) => {
    const gadget = sequelize.define("gadget", {
        gadgetID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gadgetName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gadgetDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return gadget;
};