var express = require('express');
var app = express();

// Import User Module Containing Functions Related To User Data
var user = require('./sql');

// API Routes
app.get('/', function(req, res) {

	user.findAll(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});

app.post('/adduser', function(req, res, next) {
	
	var data = req.body;
	user.findByUsername(data.username, function(err, rows, fields) {
		if(rows.length == 1) {
			user.sendResponse(false, res);
		} else {
				user.addUser(data, function(err, info) {
					data = {
					username: data.username,
					uuid:data.uuid,
					chat_date:data.date,
					sender:'admin',
					rx_chat: data.rx,
					tx_chat:data.tx
				};
					if(err) throw err;
					console.log(info);
					user.sendResponse(true, res);
				});
		};
	});
});

module.exports = app;

