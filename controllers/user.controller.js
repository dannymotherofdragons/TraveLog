const utilities = require('../utilities/utilities.js')
const db = require("../models/db.js");
const bcrypt = require('bcrypt');
const user = db.user;
const { Op } = require("sequelize");

const usersModel = require('../models/user.model.js');
const Users = usersModel.Users;


exports.register = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                email: req.params.email
            }
        });
        if (user) {
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        }
        user = await Users.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        return res.status(200).json({
            message: "User was registered successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
};

exports.login = async (req, res) => {
  try {
    let user = await user.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).json({ message: "Utilizador não existe." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordIsValid) {
        utilities.generateToken({user: req.body.username}, (token) => {
            res.status(200).json(token); 
        })
    }
    else {
        res.status(401).send("Palavra passe inválida."); 
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
    try {
        const user = await Users.findAll()
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(400).json({
                message: "Couldn't find any user"
            })
        }
    } catch (err){
        req.status(400).json({
            message: err.message
        })
    }
}

exports.findOne = async (req, res) => {
    try {
        const user = await Users.findByPk(req.body.id);
        if (user === null)
            res.status(404).json({
                message: `Não foi possível encontrar o user com ID "${req.body.userID}".`
            });
        else res.status(200).json(user);
        } 
    catch (err) {
        res.status(500).json({
            message:
            err.message || `Erro ao encontrar o user com ID "${req.body.userID}".`
        });
    }
};

exports.getLoggedUser = async (req, res) =>{
    Users.findOne({
        where: {
            id: req.loggedUserId
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

exports.update = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: "O corpo do pedido não pode estar vazio, tem de ter pelo menos o nome." });
        return;
    }
    try {
        const user = await Users.findByPk(req.params.userID);
            if (!user) {
                res.status(404).json({
                message: `Não foi possível encontrar o user com ID "${req.params.userID}".`
                });
            } else {
                user.update(req.body, { where: { id: req.params.userID } });
                res.status(200).json({
                message: `O user com ID "${req.params.userID}" foi atualizado.`
                });
            }
    } catch (err) {
        res.status(500).json({
            message: `Erro ao atualizar o user com ID "${req.params.userID}".`
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await Users.findByPk(req.body.id);
        if (!user) {
            return res.status(404).json({
                message: `Não foi possível encontrar o user com ID "${req.body.id}".`
            });
        } else {
            user.destroy({ where: { id: req.body.id } });
            return res.status(200).json({
                message: `O user com ID "${req.body.id}" foi eliminado.`
            });
        }
    } catch (err) {
    return res.status(500).json({
        message: `Erro ao eliminar o user com ID "${req.body.id}".`
    });
    }
};
