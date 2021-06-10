const db = require("../models/db.js");

const gadgets = db.gadget;
const comments = db.comments;
const gadget_comments = db.gadget_comments;
const subjects = db.subject;

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


};*/



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



exports.getOneGadget = (req, res) => {
    gadgets.findOne({
            where: {
                gadgetName: req.params.gadgetName
            }
        })
        .then(data => {
            if (data === null) {
                res.status(200).json({
                    message: `gadget with name: ${req.params.gadgetName} doesn't exist!`
                });
                return;
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving gadget."
            });
        })
}



exports.createGadget = (req, res) => {
    gadgets.create({
            gadgetName: req.body.gadgetName,
            //description: req.body.gadgetDescription,
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
                    message: err.message || "Some error occurred while creating the gadget."
                });
        });
}



exports.updateGadget = (req, res) => {
    gadgets.update({
            gadgetName: req.body.gadgetName,
            //gadgetDescription: req.body.gadgetDescription,
            tags: req.body.tags
        }, {
            where: {
                gadgetName: req.params.gadgetName
            }
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(200).json({
                    message: "No gadget was found with this name."
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



exports.deleteGadget = (req, res) => {
    gadgets.destroy({
            where: {
                gadgetName: req.params.gadgetName
            }
        })
        .then(num => {
            if (num == 0) {
                res.status(200).json({
                    message: `No Gadget with id: ${req.params.gadgetName} was found on the database.`
                });
                return;
            }
            res.status(200).json({
                message: "gadget deleted with success."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while trying to delete gadget.'
            })
        })
}


exports.createComment = (req, res) => {
    comments.create({
            commentText: req.body.commentText
        })
        .then(data => {
            gadget_comments.create({
                    gadgetName: req.params.gadgetName,
                    commentID: data.commentID,
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
                            message: err.message || "error."
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
                    message: err.message || "error."
                });
        });
};


exports.getComments = (req, res) => {
    comments.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        })
}


exports.deleteComment = (req, res) => {
    gadget_comments.destroy({
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
                    res.status(200).json({message: "comment deleted with sucess!"})
                )
                return;
            }
            res.status(200).json({
                message: `No Comment with id: ${req.params.commentID} was found on the database.`
            });
        }
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while trying to delete Comment.'
            })
        })
}


exports.getAllSubjects = (req, res) => {
    subjects.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error retrieving subjects"
            });
        })
}


exports.createSubject = async (req, res) => {
    let subject = await subjects.findOne({where: {subjectID: req.body.subjectID}})
    if (subject === null) {
        subjects.create({
            subjectID: req.body.subjectID,
            subjectName: req.body.subjectName
        })
        .then(data => {
            res.status(201).json({
                message: "new subject created.",
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
                    message: err.message || "error."
                });
        });
    } else {
        res.status(200).json({message: "subject already exists"})
    }
    
}