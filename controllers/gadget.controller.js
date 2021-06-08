const db = require("../models/db.js");

// Call database tables
const gadgets = db.gadget;
const likes = db.likes;
const comments = db.comments;
const subjects = db.subject;
const tags = db.tags;


exports.getAllGadgets = (req, res) => {
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
exports.getGadget = (req, res) => {
    gadgets.findOne({
            where: {
                gadgetID: req.params.gadgetID
            }
        })
        .then(data => {
            if (data === null) {
                res.status(200).json({
                    message: `Gadget id: ${req.params.gadgetID} doesn't exist!`
                });
                return;
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving gdgt."
            });
        })
}

// Function used to create a gadget
exports.createGadget = (req, res) => {
    gadgets.create({
            gadgetName: req.body.gadgetName,
            tags: req.body.tags,
            subject: req.body.subject
        })
        .then(data => {
            res.status(201).json({
                message: "gadget created.",
                location: "/gadgets/" + data.gadgetID
            });

        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating gadget."
                });
        });
}

// Function used to update a tool
exports.updateGadget = (req, res) => {
    gadgets.update({
            gadgetName: req.body.gadgetName,
            tags: req.body.tags,
            subject: req.body.subject
        }, {
            where: {
                gadgetID: req.params.gadgetID
            }
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(200).json({
                    message: "gadget not found with id."
                })
                return;
            }
            res.status(200).json({
                message: "gadget updated"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error ocurred while updating."
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
                    message: `No id: ${req.params.gadgetID} was found on the database.`
                });
                return;
            }
            res.status(200).json({
                message: "deleted."
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
            commentText: req.body.comment
        })
        .then(data => {
            comment.create({
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
                    if (err.username === 'SequelizeValidationError')
                        res.status(400).json({
                            message: err.errors[0].message
                        });
                    else
                        res.status(500).json({
                            message: err.message || "some error occurred while creating comment."
                        });
                });
        })
        .catch(err => {
            if (err.username === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "some error occurred while creating."
                });
        });
};


// Function used to get all comments
exports.getAllComments = (req, res) => {
    comments.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error"
            });
        })
}

// Function used to delete a comment
exports.deleteComment = (req, res) => {
    comments.destroy({
            where: {
                commentID: req.params.commentID
            }
        })
        .then(num => {
            if (num != 0) {
                comments.destroy({
                    where: {
                        commentID: req.params.commentID
                    }
                }).then(
                    res.status(200).json({
                        message: "Comment deleted with sucess!"
                    })
                )
                return;
            }
            res.status(200).json({
                message: `No comment with id: ${req.params.commentID} was found on the database.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while trying to delete.'
            })
        })
}

// Function used to get all subjects
exports.getAllSubjects = (req, res) => {
    subjects.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error."
            });
        })
}


// Function used to create a subject
exports.createSubject = async (req, res) => {
    let subject = await subjects.findOne({where: {subjectID: req.body.subjectID}})
    if (subject === null) {
        subjects.create({
            subjectName: req.body.subjectName
        })
        .then(data => {
            res.status(201).json({
                message: "New Subject created.",
                location: "/subjects/" + data.subject_id
            });
    
        })
        .catch(err => {
            if (err.subjectN-name === 'SequelizeValidationError')
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
                subjectName: req.params.subjectName
            }
        })
        .then(num => {
            if (num != 0) {
                res.status(200).json({
                    message: "deleted"
                })
                return;
            }
            res.status(200).json({
                message: `No subject with this name: ${req.params.subjectName} was found on the database.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'error deleting'
            })
        })
}