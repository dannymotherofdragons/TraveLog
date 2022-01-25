const express = require("express");
let router = express.Router();
const { validationResult, body, param } = require("express-validator");
const repostController = require("../controllers/repost.controller");
const { repost } = require("../models/db");

router.route("/repostPost").post(
    body("userID").isNumeric().notEmpty(),
    body("postID").isNumeric().notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            repostController.createRepost(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/getRepostById").get(
    body("id").isNumeric().notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            repostController.getRepostById(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/addLikeToRepost").put(
    body("id").isNumeric().notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            repostController.addLike(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/dislikeRepost").put(
    body("id").isNumeric().notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            repostController.dislike(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

module.exports = router;