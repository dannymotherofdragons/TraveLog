const express = require('express');

let router = express.Router();

const authController = require('../controllers/auth.controller');

router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/signin')
    .post(authController.signin);

router.route('/signup')
    .post(authController.signup);


    /*
// Route that responds to any other request that is not accounted
router.all('*', function (req, res) {
    res.status(404).json({
        message: 'Auth: what???'
    });
})*/

module.exports = router;