module.exports = (sequelize, DataTypes) => {
    const gadget_comments = sequelize.define("gadget_comments", {

        //ended up having to use gadget name cause the ID didnt' work to create but also neither does this function sooooooo
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