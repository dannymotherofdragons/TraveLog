module.exports = (sequelize, DataTypes) => {
    const subject = sequelize.define("subjects", {
        subjectID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subject_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return subject;
}