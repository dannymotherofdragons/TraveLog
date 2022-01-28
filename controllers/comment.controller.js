const utilities = require('../utilities/utilities.js')
const db = require("../models/db.js");
const bcrypt = require('bcrypt');
const comment = db.comment;
const { Op } = require("sequelize");
const modelComment = require("../models/comment.model.js");
const modelPost = require("../models/post.model.js")
const modelUser = require("../models/user.model.js")
const Comment = modelComment.Comments;
const Post = modelPost.Posts;
const Users = modelUser.Users;


exports.addComment = async (req, res) =>{
    try{
        let user = await Users.findByPk(req.body.userID);
        let post = await Post.findByPk(req.body.postID);

        if(user){
            if(post)
            {
                Comment.create({
                    userID: user.id,
                    username: user.username,
                    postID: post.id,
                    commentContent: req.body.commentContent
                }).then((result) => {
                    res.status(200).json(result);
                }).catch((error) => {
                    res.status(400).send('ERROR: ' + error)
                })
            }
            else{
                res.status(400).json({
                    message: `No post with the ID: ${req.body.postID} was found`
                })
            }
        }
        else{
            res.status(400).json({
                message: `No user with the ID: ${req.body.postID} was found`
            })
        }
    } catch (err){
        res.status(500).json({
            message:err.message
        })
    }    
}

exports.addCommentToComment = async (req, res) =>{
    try{
        let user = await Users.findByPk(req.body.userID);
        let comment = await Comment.findByPk(req.body.commentID);

        if(user){
            if(comment)
            {
                Comment.create({
                    userID: user.id,
                    username: user.username,
                    commentID: comment.id,
                    commentContent: req.body.commentContent
                }).then((result) => {
                    res.status(200).json(result);
                }).catch((error) => {
                    res.status(400).send('ERROR: ' + error)
                })
            }
            else{
                res.status(400).json({
                    message: `No comment with the ID: ${req.body.commentID} was found`
                })
            }
        }
        else{
            res.status(400).json({
                message: `No user with the ID: ${req.body.postID} was found`
            })
        }
    } catch (err){
        res.status(500).json({
            message:err.message
        })
    }    
}

exports.editComment = async (req, res) =>{
    Comment.update({
        commentContent: req.body.commentContent
    }, {
        where: {
            id: req.params.id
        }
    })
    .then((result) => {
        result.status(200).json({
            message: "Comment edited with success"
        });
    })
    .catch(err => {
        result.status(400).send({
            message: err.message || 'Some error ocurred while trying to edit the comment.'
        })
    })
}

exports.deleteComment = async (req, res) =>{
    Comment.destroy({
        where: {
            id: req.body.id
        }
    }).then(num => {
        if(num == 0){
            res.status(200).json({
                message: `No comment with id: ${req.body.id} was found on the database.`
            });
            return;
        }
        res.status(200).json({
            message: "Comment deleted with success"
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'Some error ocurred while trying to delete Comment'
        })
    })
}

exports.findCommentByID = async (req, res) =>{
    try{
        let comment = await Comment.findByPk(req.body.commentID)
        if (comment === null)
            res.status(404).json({
                message: `Não foi possível encontrar o comment com ID "${req.body.id}".`
            });
        else res.status(200).json(comment);
        } 
    catch (err) {
        res.status(500).json({
            message:
            err.message || `Erro ao encontrar o comment com ID "${req.body.id}".`
        });
    }
};

exports.findAllComments = async (req, res) =>{
    try{
        let post = await Post.findByPk(req.body.postID)
        if(post)
        {
            let comments = await Comment.findAll({
                where: {
                    postID: post.id
                }
            })
            if(comments)
            {
                res.status(200).json(comments);
            }
        }
    } catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

