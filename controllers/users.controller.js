// get resource model (definition and DB operations)
const db = require('../models/db.js');

const users = db.user;

// Sequelize operator
const {
    Op
} = require('sequelize');


exports.getLoggedUser = async (req, res) => {
    let user = await users.findByPk(req.loggedUserID)
    users.findOne({
            where: {
                userID: req.params.userID
            }
        })
        .then(data => {
            if (user.userID === data.user_id || user.prof === true) {
                res.status(200).json(data);
                return;
            }
            res.status(400).json({
                messge: "User doesn't have permission"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving logged User."
            });
        })
}



exports.getAllUsers = (req, res) => {
    users.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the users."
            });
        })
};



exports.createUser = async (req, res) => {
    let user = await users.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user === null) {
        users.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8), // generates hash to password
                prof: req.body.prof,
            })
            .then(data => {
                res.status(201).json({
                    message: "New User created.",
                    location: "/users/" + data.userID
                });

            })
            .catch(err => {
                if (err.username === 'SequelizeValidationError')
                    res.status(400).json({
                        message: err.errors[0].message
                    });
                else
                    res.status(500).json({
                        message: err.message || "Some error occurred while creating the User."
                    });
            });
    } else {
        res.status(200).json("Email is already in use")
    }

};


exports.updateUser = async (req, res) => {
    const user = await users.findByPk(req.loggedUserId)
    let prof;
    if (user.prof === true) {
        prof = req.body.prof
    } else {
        prof = user.prof
    }
    users.update({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            prof: prof,
        }, {
            where: {
                userID: req.params.userID
            }
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(200).json({
                    message: "No User was found with this id."
                })
                return;
            }
            res.status(200).json({
                message: "User updated with success!"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while updating User."
            })
        });
}


exports.deleteUser = async (req, res) => {
    let user = await users.findByPk(req.params.userID)
    if (user) {
        if (user.isProf != true) {
            users.destroy({
                    where: {
                        userID: req.params.userID
                    }
                })
                .then(num => {
                    if (num == 0) {
                        res.status(200).json({
                            message: `No User with id: ${req.params.userID} was found on the database.`
                        });
                        return;
                    }
                    res.status(200).json({
                        message: "User deleted with success."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error ocurred while trying to delete user.'
                    })
                })
        } else {
            res.status(200).json({
                message: "Can't delete an admin user"
            })
        }
    } else {
        res.status(200).json({
            message: `No User with id: ${req.params.userID} was found on the database.`
        });
    }
};

/*
// function to get all user types (isProf or not)
exports.isProf = (req, res) => {
    users.isProf({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data = req.body.isProf) {
                if (data == false) {
                    res.status(500).send({
                        message: err.message || 'You are not a professor.'
                    })
                    return;
                }

                if (data == true) {
                    res.status(200).json({
                        message: 'Success.'
                    })
                    return;
                }

            };
        })
}; */