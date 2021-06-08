// Get database info
const db = require("../models/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

// Call database tables
const users = db.user;

// Function used to get all tools
exports.signin = async (req, res) => {
    try {
        let user = await users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(404).json({
            message: "User Not found."
        });
        // tests a string (password in body) against a hash (password in database)
        const passwordIsValid = await bcrypt.compareSync(
            req.body.password, user.password.toString()
        );

        if (
            !passwordIsValid
            // req.body.user_password != user.user_password
        ) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }




        // sign the given payload (user ID) into a JWT payload – builds JWT token, using secret key
        const token = jwt.sign({
            id: user.userID
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        let userType;
        if (user.userType === true)
            userType = "professor"
        else
            userType = "aluno"

        // Return
        return res.status(200).json({
            id: user.userID,
            username: user.username,
            email: user.email,
            userType: userType,
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
        // check duplicate user
        let user = await users.findOne({
            where: {
                email : req.body.email
            }
        });
        if (user)
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        // save User to database
        user = await users.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8), // generates hash to password
            userType: false,
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
    // verify request token given the JWT secret key
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.loggedUserId = decoded.id; // save user ID for future verifications
        next();
    });
    
};