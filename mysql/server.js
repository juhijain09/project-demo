var express = require('express');
var bodyParser = require('body-parser');
// var bcrypt = require('bcrypt');
var mysql = require('mysql');
// Initialize Express App
var app = express();

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use('/', express.static(__dirname));

// Import API Routes
app.use(require('./sql.service'));


port = 3000;

app.listen(port, function() {
	console.log("listening to port " + port);
})

