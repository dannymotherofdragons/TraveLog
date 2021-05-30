module.exports = (sequelize, DataTypes) => {
    const like = sequelize.define("like",{
        likeID:{
            type: DataTypes.INTEGER,
            references: {
                primaryKey: true,
                model: 'users',
                key: 'id'
            }
        },
    });
    return like;
}