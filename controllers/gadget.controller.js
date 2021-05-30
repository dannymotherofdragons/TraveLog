const db = require("../models/db.js");

// Call database tables
const users = db.users;

// Sequelize operator
const {
    Op
} = require('sequelize');

// Function used to get all tools
exports.getAllGadgets = (req, res) => {
    res.status(200).json({message: "Getting all gadgets"})
}

