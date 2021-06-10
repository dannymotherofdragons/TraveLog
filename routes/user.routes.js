const express = require('express');

let userRouter = express.Router();

const userController = require('../controllers/users.controller.js');
const authController = require('../controllers/auth.controller.js');

userRouter.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { 
        const diffSeconds = (Date.now() - start) / 1000; 
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

userRouter.get('/', userController.getAllUsers)
userRouter.post('/', authController.verifyToken, userController.createUser)

userRouter.delete('/:userID', userController.deleteUser)

userRouter.route('/:userID')
    .get(authController.verifyToken, userController.getLoggedUser)
    .put(authController.verifyToken, userController.updateUser)
    .delete(authController.verifyToken, userController.deleteUser)
    
/*
// Routes 127.1.0.0:8080/user/
userRouter.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)



// Routes 127.1.0.0:8080/user/:userID>, routes that need the user ID
userRouter.route('/:userID')
    .delete(userController.deleteUser)
    .put(userController.updateUser)
*/

// unexpected
/*userRouter.all('*', function (req, res) {
    res.status(404).json({
        message: 'users: what???'
    });
})*/

// Export user routes router
module.exports = userRouter;