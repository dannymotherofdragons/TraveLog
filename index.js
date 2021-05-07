// Call modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Begin the creation of the server
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.1.0.0';

// Apply modules to the server
app.use(cors());
app.use(express.json());

// Routes 127.1.0.0:8080/
app.get('/', function (req, res) {
    res.status(200).json({
        message: 'home'
    });
});