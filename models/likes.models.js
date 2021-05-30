module.exports = (sequelize, DataTypes) => {
    const like = sequelize.define("like",{
        likeID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            /*references: {
                model: 'users',
                key: 'userID'
            }*/

        },
        
    });
    return like;
}