const express = require("express");
let router = express.Router();
const { validationResult, body, param } = require("express-validator");
const commentController = require("../controllers/comment.controller.js");
const { comment } = require("../models/db.js");

router.route("/comment").post(
    body("userID").isNumeric().notEmpty().escape(),
    body("postID").isNumeric().notEmpty().escape(),
    body("commentContent").notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            commentController.addComment(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/comment").post(
    body("userID").isNumeric().notEmpty().escape(),
    body("commentID").isNumeric().notEmpty().escape(),
    body("commentContent").notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            commentController.addCommentToComment(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/findCommentsOnPost").get(
    body("postID").isNumeric().notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            commentController.findAllComments(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/findComment").get(
    body("commentID").isNumeric().notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            commentController.findCommentByID(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array()});
        }
    }
)

module.exports = router;

