// Get database info
const db = require("../models/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

// Call database tables
const Users = db.user;

exports.signin = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(404).json({
            message: "User Not found."
        });
        const passwordIsValid = await bcrypt.compareSync(
            req.body.password, user.password.toString()
        );

        if (
            !passwordIsValid
        ) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({
            id: user.userID
        }, config.secret, {
            expiresIn: 86400
        });

        let isProf;
        if (user.isProf === true)
            role = "professor"
        else
            role = "aluno"

        return res.status(200).json({
            id: user.userID,
            username: user.username,
            email: user.email,
            role: isProf,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };

}

exports.signup = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user)
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        user = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            isProf: false,
        });

        return res.json({
            message: "User was registered successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
};

exports.verifyToken = (req, res, next) => {
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
        next();
    });
};


exports.isProf = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserID);
    console.log(user.user_type_id)
    if (user.isProf === true) {
        next();
        return;
    }
    return res.status(403).send({
        message: "Require Admin Role!"
    })
};

exports.isProfOrLogged = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserID);
    if (user.isProf === true || user.userID === parseInt(req.params.userID)){
        next();
        return;
    }
    return res.status(403).send({
        message: "Require prof Role!"
    });
};