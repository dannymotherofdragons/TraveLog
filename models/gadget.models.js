const db = require("../models/db.js");

// Call database tables
const gadget = function (gadget) {
this.name = gadget.name;
this.id = gadget.id;
this.tag = gadget.tagl;
this.comment = gadget.comment;
this.subject = gadget.subject;
this.link = gadget.link;
this.desc = gadget.description;
};

// Sequelize operator
const {
    Op
} = require('sequelize');

gadget.getAll = (result) => {
    sql.query("SELECT * FROM gadgets", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res); // the result will be sent to the CONTROLLER
    });
};
// EXPORT MODEL (required by CONTROLLER)
module.exports = gadget;