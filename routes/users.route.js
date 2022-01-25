const express = require("express");
let router = express.Router();
const { validationResult, body, param } = require("express-validator");
const authController = require("../controllers/auth.controller.js");
const utilities = require('../utilities/utilities.js');
const userController = require("../controllers/user.controller.js");

// Rotas públicas

/**
 * @route POST /users/register
 * @group Authentication
 * @param {user.model} user.body
 * @returns {object} 201 - User Registed
 * @returns {Error} 400 - Bad Request
 * @returns {Error} 406 - Duplicated User
 */
router.route("/register").post( // Registar
  body("name").notEmpty().escape(),
  body("age").optional().isNumeric(),
  body("email").isEmail().normalizeEmail(),
  body("username").notEmpty().escape(),
  body("password").notEmpty().escape(),
  (req, res) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          authController.register(req, res);
      } else {
          res.status(404).json({ errors: errors.array() });
      }
  }
)

/**
 * @route POST /users/login
 * @group Authentication
 * @param {Login.model} login.body
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Bad Request
 * @returns {Error} 401 - Missing / Failed Authentication
 */
router.route("/login").post( // Autenticar
  body("username").notEmpty().escape(),
  body("password").notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            authController.signIn(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
)

/**
 * @route GET /users
 * @group users
 * @param {number} age.query
 * @returns {object} 200 - Array of users
 * @returns {Error} 400 - Bad Request
 */
router.route("/getAllUsers").get(
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            userController.findAll(req, res);
        }
        else{
            res.status(404).json({ errors: errors.array() });
        }
    }
)

/**
 * @route GET /users/{userID}
 * @group users
 * @param {integer} userID.path.required
 * @returns {object} 200 - user Information
 * @returns {Error} 400 - Bad Request
 * @returns {Error} 404 - user Not Found
 */
/*
router.get("/:userID", param("id").isNumeric(), (req, res) => { // Obter usere através do ID
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      userController.findOne(req, res);
  } else {
      res.status(404).json({ errors: errors.array() });
  }
});*/

router.route("/:id").get(
    body("id").isNumeric().notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            userController.findOne(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
)

// Rotas privadas

/**
 * @route PUT /users/{userID}
 * @group users
 * @param {integer} userID.path.required
 * @param {user.model} user.body.required
 * @returns {object} 200 - user Succesfully Updated
 * @returns {Error} 400 - Bad Request
 * @returns {Error} 401 - Missing / Failed Authentication
 * @returns {Error} 403 - Forbidden
 * @security JWT
 */
router.put("/:userID", utilities.verifyToken, param("userID").isNumeric(),
  body("name").optional().escape(),
  body("age").optional().isNumeric(),
  body("email").optional().isEmail().normalizeEmail(),
  body("username").optional().escape(),
  body("password").optional().escape(),
  (req, res) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          userController.update(req, res);
      } else {
          res.status(404).json({ errors: errors.array() });
      }
  }
);

/**
 * @route DELETE /users/{userID}
 * @group users
 * @param {integer} userID.path.required
 * @returns {object} 200 - user Deleted
 * @returns {Error} 400 - Bad Request
 * @returns {Error} 401 - Missing / Failed Authentication
 * @returns {Error} 403 - Forbidden
 * @security JWT
 */
router.delete("/:id", 
  body("id").isNumeric(),
  (req, res) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          userController.delete(req, res);
      } else {
          res.status(404).json({ errors: errors.array() });
      }
  }
);

// Rotas inválidas
router.all("*", function(req, res) {
  res.status(404).json({ message: "Esta rota não existe ou não está definida!" });
});

module.exports = router;