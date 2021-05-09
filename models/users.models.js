const sql = require("./db.js");

// define name model constructor
const user = function (user) {
    this.name = user.name;
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.isProfessor = user.isProfessor;
};
// define method getAll to handle getting all users from DB
// result = "(error, data)", meaning it will return either an error message or some sort of data
user.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res); // the result will be sent to the CONTROLLER
    });
};
// EXPORT MODEL (required by CONTROLLER)
module.exports = user;