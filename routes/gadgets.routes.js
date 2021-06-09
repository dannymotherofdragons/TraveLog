const express = require('express');

let gadgetsRouter = express.Router();

const gadgetsController = require('../controllers/gadget.controller');


// middleware for all routes related with users
gadgetsRouter.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

gadgetsRouter.route('/')
    //.get(gadgetsController.getAllGadgets)
    .post(gadgetsController.createGadget)

//send a predefined error message for invalid routes on users
//gadgetsRouter.all('*', function (req, res) {
  //  res.status(404).json({
        message: 'gadgets: ???'
    //});
//})

// EXPORT ROUTES (required by APP)
module.exports = gadgetsRouter;