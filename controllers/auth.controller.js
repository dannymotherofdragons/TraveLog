const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//*CALL USERS TABLE
const usersModel = require('../models/user.model.js');
const Users = usersModel.Users;

const signIn = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) return res.status(404).json({
            message: "User Not found."
        });
        const passwordIsValid = Boolean; 
        if(user.password === req.body.password)
        {
            passwordIsValid = true;
        }

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({
                id: user.id
            },
            config.secret, {
                expiresIn: 86400
            });

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
};

exports.register = async(req, res)=>{
    try {
        let user = await Users.findOne({
            where:{
                email: req.body.email
            }
        });
        if(user) {
            return res.status(400).json({
                message: "Failed! Email is already in use" + user.id
            });
        }
        user = await Users.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        return res.status(200).json({
            message: "User was registered successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



const verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.loggedUserId = decoded.id;
        return req.loggedUserId
    });
};

exports.signIn = signIn;
exports.verifyToken = verifyToken;