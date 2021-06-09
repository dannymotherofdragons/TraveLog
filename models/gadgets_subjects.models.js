module.exports = (sequelize, DataTypes) => {
    const gadget_subject = sequelize.define("gadget_subject", {
        gadgetID: {  // Foreign key that determines the tool
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'gadget',
                key: 'gadgetID'
            }
        },
        subjectID: {   // Foreign key that determines the subject
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'subject',
                key: 'subjectID'
            }
        }
    }, {
        timestamps: false
    });
    return gadget_subject;
}