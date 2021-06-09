module.exports = (sequelize, DataTypes) => {
    const subject = sequelize.define("subjects", {
        subjectID: {   // Identifier of each subject
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subjectDescription: { // The initials of each subject
            type: DataTypes.STRING,
            allowNull: false
        },
        subjectName: { // The complete namo of the subject
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return subject;
}