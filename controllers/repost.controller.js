const modelPost = require('../models/post.model.js');
const modelUser = require('../models/user.model.js');
const modelRepost = require('../models/repost.model.js');
const router = require('../routes/post.route');
const Post = modelPost.Posts;
const User = modelUser.Users;
const Repost = modelRepost.Repost;

exports.createRepost = async(req, res) =>{
    try{
        let repostUser = await User.findByPk(req.body.userID);
        if(repostUser){
            let post = await Post.findByPk(req.body.postID);
            if(post){
                Repost.create({
                    postID: post.id,
                    userID: repostUser.id,
                    repostText: `@${post.username} ` + post.postText,
                    likes: 1
                }).then((result) => {
                    res.status(200).json(result);
                }).catch((error) => {
                    res.status(400).send('ERROR: ' + error)
                })
            }
            else{
                res.status(400).json({
                    message: `No post with ID: ${req.body.postID} found`
                })
            }
        }
        else{
            res.status(400).json({
                message: `No user with ID: ${req.body.userID} found`
            })
        }
    } catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getRepostById = async(req, res)=>{
    try{
        let repost = await Repost.findByPk(req.body.id);
        if(repost){
            res.status(200).json(repost);
        }
        else{
            res.status(400).json({
                message: `No repost with the ID: ${req.body.id} was found`
            })
        }
    } catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

exports.addLike = async(req, res)=> {
    try{
        let repost = await Repost.findByPk(req.body.id);
        if(repost){
            Repost.update({
                likes: repost.likes + 1
                }, {
                    where: {
                        id: req.body.id
                    }
                }).then(data =>{
                    res.status(200).json({
                        message: `Like added with success, repost with id: ${req.body.id}` 
                    })
                }).catch(err => {
                    res.status(400).json({
                        message: err.message || "Couldn't like this repost"
                    })
                })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.dislike = async(req, res)=> {
    try{
        let repost = await Repost.findByPk(req.body.id);
        if(repost){
            Repost.update({
                likes: repost.likes - 1
                }, {
                    where: {
                        id: req.body.id
                    }
                }).then(data =>{
                    res.status(200).json({
                        message: `Disliked with success, repost with id: ${req.body.id}` 
                    })
                }).catch(err => {
                    res.status(400).json({
                        message: err.message || "Couldn't dislike this repost"
                    })
                })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}