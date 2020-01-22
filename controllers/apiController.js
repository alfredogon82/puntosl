var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1q2w3e4r5T",
	database: "puntosleal"
});

module.exports = function(app) {
	
	app.get('/', function(req, res) {

		con.query('SELECT * from user', function(err, rows){
			if(err) throw err;
			console.log("Getting users:"+rows);
			res.json({ user: rows});
		});

	});
	
}