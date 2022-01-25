const modelPost = require('../models/post.model.js');
const modelUser = require('../models/user.model');
const Post = modelPost.Posts;
const User = modelUser.Users;

exports.addPost = async(req, res)=>{
    try{
        let user = await User.findByPk(req.body.userID);
        if(user)
        {
            Post.create({
                userID: user.id,
                username: user.username,
                postText: req.body.postText,
                likes: 1
            }).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(400).send('ERROR: ' + error)
            })
        }
        else{
            res.status(400).json({
                message: "No user with given ID found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.findOne = async(req, res)=>{
    Post.findAll({
        where: {
            id: req.body.id
        }
    }).then(num => {
        if(num == 0){
            res.status(200).json({
                message: `No post with id: ${req.body.id} was found on the database.`
            });
            return;
        }
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'Some error ocurred while trying to find the Post'
        })
    })
};

exports.editPost = async(req, res)=>{
    Post.update({
        postText: req.body.postText
        }, {
            where: {
                id: req.body.id
            }
        }).then(data =>{
            res.status(200).json({
                message: `Succesfully edited post, post with id: ${req.body.id}` 
            })
        }).catch(err => {
            res.status(400).json({
                message: err.message || "Couldn't edit this post"
            })
        })
}

exports.addLike = async(req, res)=>{
    try{
        let post = await Post.findByPk(req.body.id);
        if(post){
            Post.update({
                likes: post.likes + 1
                }, {
                    where: {
                        id: req.body.id
                    }
                }).then(data =>{
                    res.status(200).json({
                        message: `Like added with success, post with id: ${req.body.id}` 
                    })
                }).catch(err => {
                    res.status(400).json({
                        message: err.message || "Couldn't like this post"
                    })
                })
        }
        else{
            res.status(400).json({
                message: `There is not post with ID: ${req.body.id}`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



exports.deletePost = async(req, res)=>{
    Post.destroy({
        where: {
            id: req.body.id
        }
    }).then(num => {
        if(num == 0){
            res.status(200).json({
                message: `No post with id: ${req.body.id} was found on the database.`
            });
            return;
        }
        res.status(200).json({
            message: "Post deleted with success"
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'Some error ocurred while trying to delete Post'
        })
    })
};

exports.deleteLike = async(req, res)=>{
    try{
        let post = await Post.findByPk(req.body.id);
        if(post){
            if(post.likes > 0){
                Post.update({
                    likes: post.likes - 1
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(data =>{
                        res.status(200).json({
                            message: `Disliked with success, post with id: ${req.body.id}` 
                        })
                    }).catch(err => {
                        res.status(400).json({
                            message: err.message || "Couldn't dislike this post"
                        })
                    })
            }
            else{
                res.status(200).json({
                    message: "A post can't have less than 0 likes"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
