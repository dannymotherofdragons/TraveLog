const db = require("../models/db.js");

// Call database tables
const users = db.users;
const gadgets = db.gadgets;

// Sequelize operator
const {
    Op
} = require('sequelize');

// Function used to get all tools
exports.getAllTools = (req, res) => {
    res.status(200).json({message: "hello"})
}