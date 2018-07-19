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
		console.log(data.username)

			user.addUser(data, function(err, info) {
				console.log(data);
				data = {
					username: data.username,
					// uuid:data.uuid,
					chat_date:data.chat_date,
					sender:'admin',
					rx_chat: data.rx_chat,
					tx_chat:data.tx_chat
				};
					if(err) throw err;
					console.log(info);
					user.sendResponse(true, res);
				});

		
	});

});
app.post('/findByUsername', function(req, res, next){
	var data = req.body;
	user.findByUsername(data.username, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
});

module.exports = app;
