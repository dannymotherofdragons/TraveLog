// Get database info
const db = require("../models/db.js");

// Call database tables
const gadgets = db.gadget;
//const comments = db.comments;
//const gadget_comments = db.gadget_comments;
//const subjects = db.subject;


// Function used to create a new user
/*exports.createGadget = async (req, res) => {
    try {
        let gadget = await gadgets.findOne({
            where: {
                gadgetName: req.body.gadgetName
            }
        })

        if (gadgetName === null) {
            gadget = await gadgets.create({
                    gadgetName: req.body.gadgetName,
                    tags: req.body.tags
                })
                .then(data => {
                    res.status(201).json({
                        message: "New gadget created.",
                        location: "/gadgets/" + data.gadgetName
                    });

                })
                .catch(err => {
                    // Tutorial model as validation for the title column (not null)
                    if (err.gadgetName === 'SequelizeValidationError')
                        res.status(400).json({
                            message: err.errors[0].message
                        });
                    else
                        res.status(500).json({
                            message: err.message || "Some error occurred while creating the User."
                        });
                });
        } else {
            res.status(200).json("id is already in use")
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };


};/*

// Function used to get all gadgets
/*exports.getAllGadgets = (req, res) => {
    gadgets.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving gadgets."
            });
        })
}

// Function used to get one tool
exports.getOneGadget = (req, res) => {
    gadgets.findOne({
            where: {
                gadgetID: req.params.gadgetID
            }
        })
        .then(data => {
            if (data === null) {
                res.status(200).json({
                    message: `Tool with id: ${req.params.gadgetID} doesn't exist!`
                });
                return;
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tool."
            });
        })
}*/

//Function used to create a tool
exports.createGadget = (req, res) => {
    gadgets.create({
            gadgetName: req.body.gadgetName,
            gadgetDescription: req.body.gadgetDescription,
            tags: req.body.tags

        })
        .then(data => {
            res.status(201).json({
                message: "New gadget created.",
                location: "/gadgets/" + data.gadgetName
            });

        })
        .catch(err => {
            if (err.gadgetName === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Tool."
                });
        });
}

// Function used to update a tool
/*exports.updateGadget = (req, res) => {
    gadgets.update({
            gadgetName: req.body.gadgetName,
            gadgetDescription: req.body.gadgetDescription,
            tags: req.body.tags
        }, {
            where: {
                gadgetID: req.params.gadgetID
            }
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(200).json({
                    message: "No gadget was found with this id."
                })
                return;
            }
            res.status(200).json({
                message: "gadget updated with success!"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while updating gadget."
            })
        });
}

// Function used to delete a tool
exports.deleteGadget = (req, res) => {
    gadgets.destroy({
            where: {
                gadgetID: req.params.gadgetID
            }
        })
        .then(num => {
            if (num == 0) {
                res.status(200).json({
                    message: `No Gadget with id: ${req.params.gadgetID} was found on the database.`
                });
                return;
            }
            res.status(200).json({
                message: "Tool deleted with success."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while trying to delete Tool.'
            })
        })
}

// Function used to create a comment
exports.createComment = (req, res) => {
    comments.create({
            commentDescription: req.body.commentDescription
        })
        .then(data => {
            gadget_comments.create({
                    gadgetID: req.params.gadgetID,
                    commentID: data.commentID,
                    userID: req.loggedUserId
                })
                .then(data2 => {
                    res.status(201).json({
                        data,
                        data2
                    });
                    return;
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError')
                        res.status(400).json({
                            message: err.errors[0].message
                        });
                    else
                        res.status(500).json({
                            message: err.message || "Some error occurred while creating the Comment."
                        });
                });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Comment."
                });
        });
};

// Function user for a user to give a like/deslike to a tool
exports.leaveLike = (req, res) => {
    UserToolLike.findOne({
            where: {
                user_id: req.loggedUserId,
                tool_id: req.params.toolId
            }
        })
        .then(data => {
            if (data === null) {
                UserToolLike.create({
                        user_id: req.loggedUserId,
                        tool_id: req.params.toolId,
                        like_desc: req.body.like
                    })
                    .then(data2 => {
                        res.status(200).json(data2);
                    })
                    .catch(err => {
                        if (err.name === 'SequelizeValidationError')
                            res.status(400).json({
                                message: err.errors[0].message
                            });
                        else
                            res.status(500).json({
                                message: err.message || "Some error occurred while giving a like/deslike."
                            });
                    });
            }
            res.status(200).json({
                message: "Like/Deslike already given!"
            })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while giving a like/deslike."
                });
        });
};

// Function used to get all comments
exports.getComments = (req, res) => {
    Comments.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Comments."
            });
        })
}

// Function used to delete a comment
exports.deleteComment = (req, res) => {
    ToolComments.destroy({
            where: {
                comment_id: req.params.commentId
            }
        })
        .then(num => {
            if (num != 0) {
                Comments.destroy({
                    where: {
                        comment_id: req.params.commentId
                    }
                }).then(
                    res.status(200).json({message: "Comment deleted with sucess!"})
                )
                return;
            }
            res.status(200).json({
                message: `No Comment with id: ${req.params.commentId} was found on the database.`
            });
        }
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while trying to delete Comment.'
            })
        })
}
// Function used to get all subjects
exports.getAllSubjects = (req, res) => {
    Subjects.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Subjects."
            });
        })
}

// Function used to create a subject
exports.createSubject = async (req, res) => {
    let sub = await subjects.findOne({where: {subjectDescription: req.body.subjectDescription}})
    if (sub === null) {
        subjects.create({
            subjectDescription: req.body.subjectDescription,
            subjectName: req.body.subjectName
        })
        .then(data => {
            res.status(201).json({
                message: "New Subject created.",
                location: "/subjects/" + data.subjectID
            });
    
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the Subject."
                });
        });
    } else {
        res.status(200).json({message: "Subject already created"})
    }
    
}

// Function used to delete a subject
exports.deleteSubject = (req, res) => {
    subjects.destroy({
        where: {
            subjectID: req.params.subjectID
        }
    })
    .then(num => {
        if (num != 0) {
            res.status(200).json({
                message: "Subject deleted with success"
            })
            return;
        }
        res.status(200).json({
            message: `No Subject with id: ${req.params.subjectID} was found on the database.`
        });
    }
    )
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error ocurred while trying to delete Subject.'
        })
    })
}*/