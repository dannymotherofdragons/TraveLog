// get resource model (definition and DB operations)
const db = require('../models/users.models.js');

const users = db.user;

// Sequelize operator
const {
    Op
} = require('sequelize');


// EXPORT function to display list of all users
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

// Function used to create a new user
exports.createUser = (req, res) => {
    users.create(req.body)
        .then(data => {
            res.status(201).json({
                message: "created successfully!",
                location: "/user/" + data.userID
            });

        })
        .catch(err => {
            // user model as validation for the title column (not null)
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "error when creating user!"
                });
        });
};


// Function used to update a user based on his id
exports.updateUser = (req, res) => {
    users.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(200).json({
                    message: "No user was found with this id."
                })
                return;
            }
            res.status(200).json({
                message: "user updated with success!"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error ocurred while updating user."
            })
        });
}


// Function used to delete a user based on his id
exports.deleteUser = (req, res) => {
    users.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(num => {
            if (num == 0) {
                res.status(200).json({
                    message: `No User with id: ${req.params.id} was found on the database.`
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
};

/*
// function to get all user types (isProfessor or not)
exports.isProfessor = (req, res) => {
    users.isProfessor({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data = req.body.isProfessor) {
                if (data == 0) {
                    res.status(500).send({
                        message: err.message || 'You are not a professor.'
                    })
                    return;
                }

                if (data == 1) {
                    res.status(200).json({
                        message: 'Success.'
                    })
                    return;
                }

            };
        })
}; */