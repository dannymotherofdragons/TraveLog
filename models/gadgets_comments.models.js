module.exports = (sequelize, DataTypes) => {
    const gadget_comments = sequelize.define("gadget_comments", {
        gadgetID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'gadget',
                key: 'gadgetID'
            }
        },
        commentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'comments',
                key: 'commentID'
            }
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userID'
            }
        }
    });
    return gadget_comments;
}