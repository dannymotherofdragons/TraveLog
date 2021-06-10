module.exports = (sequelize, DataTypes) => {
    const gadget_subject = sequelize.define("gadget_subject", {
        gadgetID: {  // foreign key
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'gadget',
                key: 'gadgetName'
            }
        },
        subjectID: {   // foreign key
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