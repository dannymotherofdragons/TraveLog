const db = require("../models/db.js");

// Call database tables
const gadgets = db.gadget;
const likes = db.likes;
const comments = db.comments;
const subject = db.subject;
const tags = db.tags;

// Sequelize operator
const {
    Op
} = require('sequelize');

// Function used to get all tools
exports.getAllGadgets = (req, res) => {
    res.status(200).json({message: "Getting all gadgets"})
}

