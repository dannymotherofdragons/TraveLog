require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.1.0.0';
const db = require("./models/db.js");
const {
    sequelize,
} = require('./models/db.js');

/*(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();*/

db.sequelize.sync();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).json({
        message: 'home'
    });
});

app.use('/users', require('./routes/user.routes'));

app.use('/gadgets', require('./routes/gadgets.routes'));

app.use('/auth', require('./routes/auth.routes'));

app.use('/prof', require('./routes/prof.routes'));

/*
// response to unexpected request
app.get('*', function (req, res) {
    res.status(404).json({
        message: 'not a page!'
    });
});
*/
// start server
app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));
