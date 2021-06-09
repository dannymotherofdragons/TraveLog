// Call express
const express = require('express');

// Call express router
let router = express.Router();

// Get the gadgets controller file
const gadgetsController = require('../controllers/gadget.controller');
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

// Function used to determine the time that it takes to make a request
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/users')
    .get(authController.verifyToken, usersController.getAllUsers)
    .post(authController.verifyToken, usersController.createUser)

router.route('/users/:userID')
    .delete(authController.verifyToken, usersController.deleteUser)
    .put(authController.verifyToken, usersController.updateUser)

router.route('/gadgets')
    .get(authController.verifyToken, gadgetsController.getAllGadgets)
    .post(authController.verifyToken, gadgetsController.createGadget)

//router.route('/gadgets/comments')
  //  .get(authController.verifyToken, gadgetsController.getComments)

router.route('/gadgets/comments/:commentID')
    .delete(authController.verifyToken, gadgetsController.deleteComment)

//router.route('/gadgets/:gadgetID')
  //  .get(authController.verifyToken, gadgetsController.getOnegadget)
    //.put(authController.verifyToken, gadgetsController.updategadget)
    //.delete(authController.verifyToken, gadgetsController.deletegadget)


router.route('/gadgets/:gadgetID/comments')
    .post(authController.verifyToken, gadgetsController.createComment)

router.route('/subjects')
    .get(authController.verifyToken, gadgetsController.getAllSubjects)
    .post(authController.verifyToken, gadgetsController.createSubject)

router.route('/subjects/:subjectID')
    .delete(authController.verifyToken, gadgetsController.deleteSubject);


// Route that responds to any other request that is not accounted
router.all('*', function (req, res) {
    res.status(404).json({
        message: 'prof: what???'
    });
})

// Export gadgets router
module.exports = router;