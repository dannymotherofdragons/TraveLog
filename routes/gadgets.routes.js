const express = require('express');

let gadgetsRouter = express.Router();

const gadgetsController = require('../controllers/gadget.controller');


gadgetsRouter.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { 
        const diffSeconds = (Date.now() - start) / 1000; 
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

gadgetsRouter.route('/')
    .get(gadgetsController.getAllGadgets)
    .post(gadgetsController.createGadget)

gadgetsRouter.route("/:gadgetName")
    .get(gadgetsController.getOneGadget)
    .delete(gadgetsController.deleteGadget)
    .put(gadgetsController.updateGadget)

gadgetsRouter.route("/:gadgetName/comment")
    .post(gadgetsController.createComment)

gadgetsRouter.route('/subjects')
  .get(gadgetsController.getAllSubjects)
  .post(gadgetsController.createSubject)

//send a predefined error message for invalid routes on users
//gadgetsRouter.all('*', function (req, res) {
//  res.status(404).json({
//message: 'gadgets: ???'
//});
//})


module.exports = gadgetsRouter;