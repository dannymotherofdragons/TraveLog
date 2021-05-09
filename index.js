// start modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// create server
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.1.0.0';

app.use(cors());
app.use(express.json());

// routes 127.1.0.0:8080/
app.get('/', function (req, res) {
    res.status(200).json({
        message: 'home'
    });
});

// call routes 127.1.0.0:8080/user
app.use('/', require('./routes/user.routes'));

// call routes 127.1.0.0:8080/tool
app.use('/', require('./routes/gadgets.routes'));

// response to unexpected request
app.get('*', function(req, res) {
    res.status(404).json({message: 'not a page sir!'});
});

// start server
app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));