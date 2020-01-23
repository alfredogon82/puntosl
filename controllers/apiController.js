var mysql = require('mysql');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');



var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1q2w3e4r5T",
	database: "puntosleal"
});

module.exports = function(app) {
	
	app.get('/', function(req, res) {
		console.log(req);
		con.query('SELECT * from user', function(err, rows){
			if(err) throw err;
			console.log("Getting users:"+rows);
			res.json({ users: rows});
		});

	});

	app.post('/autenticar', function(req, res) {

		console.log(req.body);

		var email = req.body.email;
		var passw = req.body.contrasena;
		var hash = crypto.createHash('md5').update(passw).digest("hex")

		con.query("SELECT * from user where email='"+email+"' and password='"+hash+"'", function(err, rows){

			if(err) throw err;
			if (rows.length==0) {

				res.json({ mensaje: "Usuario o contraseña incorrectos"});
			
			} else {

				const payload = {
	   				check:  true
	  			};

		  		const token = jwt.sign(payload, config.llave, {
		   			expiresIn: 1440
		  		});

		  		res.json({
			   		mensaje: 'Autenticación correcta',
			   		token: token
		  		});

			} 

		});
	})
	
}