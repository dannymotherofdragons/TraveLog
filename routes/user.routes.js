const express = require('express');
let userRouter = express.Router();
const userController = require('../controllers/users.controller');
// middleware for all routes related with tutorials
userRouter.use((req, res, next) => {
const start = Date.now();
res.on("finish", () => { //finish event is emitted once the response is sent to the client
const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
});
next()
})
userRouter.get('/', userController.findAll);
//send a predefined error message for invalid routes on TUTORIALS
userRouter.all('*', function (req, res) {
res.status(404).json({ message: 'TUTORIALS: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = userRouter;
