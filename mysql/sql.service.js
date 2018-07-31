var express = require('express');
var app = express();

// Import User Module Containing Functions Related To User Data
var user = require('./sql');

// API Routes
app.get('/getAllWorkerlocation', function(req, res) {

	user.findAllWorkerLocation(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});
app.get('/getAllAssetlocation', function(req, res) {

	user.findAllAssetLocation(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});
app.get('/getWorkerMessage', function(req, res) {

	user.findAllMessage(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});

app.get('/getChatBaseDBlength', function(req, res) {
	user.getChatBaseDBlength(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});
app.get('/getWorkerTablelength', function(req, res) {
	user.getWorkerInfoTablelength(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});
app.get('/getAssetTablelength', function(req, res) {
	user.getAssetInfoTablelength(function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	})
});

app.post('/addWorkerMessage', function(req, res, next) {	
			var data = req.body;
			console.log(data);
			user.addWorkerMessage(data, function(err, info) {
				console.log(data);
				data = {
         		receiver: data.receiver,
         		chat_date: data.chat_date,
         		sender: data.sender,
         		msg_txt: data.msg_txt,
         		msg_status: data.msg_status,
         		alias: data.alias
				};
					if(err) throw err;
					console.log(info);
					user.sendResponse(true, res);
				});		

});
app.post('/addWorkerlocation', function(req, res, next) {	
			var data = req.body;
			console.log('from add worker_name',data);
			user.addWorkerLocation(data, function(err, info) {
				console.log(data);
				data = {
         		worker_name: data.worker_name,
         		current_location: data.current_location,
         		entry_time: data.entry_time,
         		alias: data.alias,
         		skill: data.skill,
         		exit_time: data.exit_time
				};
					if(err) throw err;
					console.log(info);
					user.sendResponse(true, res);
				});		

});

app.post('/addAssetlocation', function(req, res, next) {	
			var data = req.body;
			console.log(data);
			user.addAssetLocation(data, function(err, info) {
				console.log(data);
				data = {
         		asset_name: data.asset_name,
         		current_location: data.current_location,
         		entry_time: data.entry_time,
         		exit_time: data.exit_time
				};
					if(err) throw err;
					console.log(info);
					user.sendResponse(true, res);
				});		

});

app.post('/findMessagebyName', function(req, res, next){
	var data = req.body;
	user.findMessagebyName(data, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
});

app.post('/trackByWorkername', function(req, res, next){
	var data = req.body;
	user.trackByWorkername(data, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
}); 
app.post('/trackByWorkerSkill', function(req, res, next){
	var data = req.body;
	user.trackByWorkerSkill(data, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
});
app.post('/trackByAssetname', function(req, res, next){
	var data = req.body;
	user.trackByAssetname(data, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
});
app.post('/trackByWorkerlocation', function(req, res, next){
	var data = req.body;
	user.trackByWorkerlocation(data, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
});
app.post('/trackByAssetlocation', function(req, res, next){
	var data = req.body;
	user.trackByAssetlocation(data, function(err, rows, fields) {
		if(err) throw err;
		res.json(rows)
    });
});

module.exports = app;
