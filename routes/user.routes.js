const express = require('express');
let userRouter = express.Router();
const userController = require('../controllers/users.controller.js');
// middleware for all routes related with users
userRouter.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

// Routes 127.1.0.0:8080/users/
userRouter.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

// Routes 127.1.0.0:8080/users/:userId, routes that need the user ID
userRouter.route('/')
    .delete(userController.deleteUser)
    .put(userController.updateUser)

// Route that responds to any other request that is not accounted
userRouter.all('*', function (req, res) {
    res.status(404).json({
        message: 'users: what???'
    });
})

// Export user routes router
module.exports = userRouter;