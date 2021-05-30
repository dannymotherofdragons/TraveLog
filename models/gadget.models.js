module.exports = (sequelize, DataTypes) => {
    const gadget = sequelize.define("gadget", {
        gadgetName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
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