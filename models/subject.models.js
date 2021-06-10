module.exports = (sequelize, DataTypes) => {
    const subjects = sequelize.define("subjects", {
        subjectID: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subjectName: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return subjects;
}