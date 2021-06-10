
const db = require("../models/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

const users = db.user;

exports.signin = async (req, res) => {
    try {
        let user = await users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(404).json({
            message: "user not found"
        });
        const passwordIsValid = await bcrypt.compareSync(
            req.body.password, user.password.toString()
        );

        if (
            !passwordIsValid
        ) {
            return res.status(401).json({
                accessToken: null,
                message: "password incorrect"
            });
        }

        const token = jwt.sign({
            id: user.userID
        }, config.secret, {
            expiresIn: 86400
        });

        /*let isProf;
        if (user.prof === true)
            role = "professor"
        else
            role = "aluno"
          */  
        return res.status(200).json({
            id: user.userID,
            username: user.username,
            email: user.email,
            //role: prof,
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
        let user = await users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user)
            return res.status(400).json({
                message: "email in use"
            });
        user = await users.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            //prof: req.body.prof,
        });

        return res.json({
            message: "registered"
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


/*exports.isProf = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserID);
    if (user.prof === true) {
        next();
        return;
    }
    return res.status(403).send({
        message: "you're not a professor"
    })
};

exports.isProfOrLogged = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserID);
    if (user.prof === true || user.userID === parseInt(req.params.userID)){
        next();
        return;
    }
    return res.status(403).send({
        message: "you're not a professor"
    });
};*/