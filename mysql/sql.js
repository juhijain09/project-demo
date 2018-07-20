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

module.exports.findAll = function(callback) {
	connection.query("SELECT * FROM chat_database ORDER BY id DESC", callback);
}


module.exports.addUser = function(data, callback) {
	connection.query("INSERT INTO chat_database SET ?", data, callback);
}

module.exports.findByUsername = function(data, callback) {
	connection.query("SELECT * FROM chat_database WHERE sender = '"+ data.sender +"' AND receiver = '"+ data.receiver +"' ORDER BY id DESC LIMIT 10", callback);
}

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}
