var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: 'CHATWINDOW'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports.findAllMessage = function(callback) {
	connection.query("SELECT * FROM chat_database ORDER BY id DESC", callback);
}

module.exports.findAllWorkerLocation = function(callback) {
	connection.query("SELECT * FROM worker_Info ORDER BY id DESC", callback);
}

module.exports.findAllAssetLocation = function(callback) {
	connection.query("SELECT * FROM asset_InfoTable ORDER BY id DESC", callback);
}
module.exports.addWorkerLocation = function(data, callback) {
	connection.query("INSERT INTO worker_Info SET ?", data, callback);
}
module.exports.addAssetLocation = function(data, callback) {
	connection.query("INSERT INTO asset_InfoTable SET ?", data, callback);
}

module.exports.addWorkerMessage = function(data, callback) {
	connection.query("INSERT INTO chat_database SET ?", data, callback);
}

module.exports.findMessagebyName = function(data, callback) {
	connection.query("SELECT * FROM chat_database WHERE sender = '"+ data.sender +"' AND receiver = '"+ data.receiver +"' ORDER BY id DESC LIMIT 10", callback);
}

module.exports.trackByWorkername = function(data, callback) {
	connection.query("SELECT * FROM worker_Info WHERE worker_name = '"+ data.worker_name +"' ORDER BY id DESC LIMIT 10", callback);
}
module.exports.trackByWorkerlocation = function(data, callback) {
	connection.query("SELECT * FROM worker_Info WHERE current_location = '"+ data.current_location +"' ORDER BY id DESC LIMIT 10", callback);
}

module.exports.trackByAssetname = function(data, callback) {
	connection.query("SELECT * FROM asset_InfoTable WHERE asset_name = '"+ data.asset_name +"' ORDER BY id DESC LIMIT 10", callback);
}
module.exports.trackByAssetlocation = function(data, callback) {
	connection.query("SELECT * FROM asset_InfoTable WHERE current_location = '"+ data.current_location +"' ORDER BY id DESC LIMIT 10", callback);
}
module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}
