const express = require("express");
let router = express.Router();
const { validationResult, body, param } = require("express-validator");
const postController = require("../controllers/post.controller");

router.route("/post").post(
    body("userID").notEmpty().escape(),
    body("postText").notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            postController.addPost(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/:id/postUpdate").put(
    body("id").notEmpty(),
    body("postText").notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            postController.editPost(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

router.route("/:id/addLike").put(
    body("id").notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            postController.addLike(req, res);
        }
        else{
            res.status(404).json( {errors: errors.array()});
        }
    }
)

router.route("/:id/dislike").put(
    body("id").notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            postController.deleteLike(req, res);
        }
        else{
            res.status(404).json( {errors: errors.array()});
        }
    }
)

router.route("/:id").get(
    param("id").isNumeric(),
    (req, res) => { // Obter usere através do ID
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            postController.findOne(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
});

router.route("/:id/deletePost").delete(
    param("id").isNumeric(),
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            postController.deletePost(req, res);
        }
        else {
            res.status(404).json({ errors: errors.array() }); 
        }
    }
)


module.exports = router;