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

	app.post('/registro', function(req, res) {

		var email = req.body.email;
		var user_id = crypto.createHash('md5').update(email).digest("hex");
		var passw = req.body.contrasena;
		var hash_contrasena = crypto.createHash('md5').update(passw).digest("hex");
		var name = req.body.nombre;
		var lastname = req.body.apellido;
		var birthdate = req.body.birthdate;

		function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(String(email).toLowerCase());
		}

		var checkEmail = validateEmail(email);

		if(checkEmail==true){

			if((email.length>0) && (passw.length>0) && (name.length>0) && (lastname.length>0) && (birthdate.length>0)){
				//res.json({ mensaje: "entra."});
			
				con.query("SELECT * from user where email='"+email+"'", function(err, rows){
					if(err) throw err;
					if (rows.length>0) {
						res.json({ mensaje: "El usuario con el email "+email+" se encuentra registrado."});
					} else {
						con.query("INSERT INTO user (user_id, name, lastname, birth_date, email, password) VALUES ('"+user_id+"', '"+name+"', '"+lastname+"', '"+birthdate+"', '"+email+"', '"+hash_contrasena+"')", function(err, rowsIns){
							if(err) throw err;
							var check = JSON.parse(JSON.stringify(rowsIns));
							if(check['affectedRows']==1){
								res.json({ mensaje: "Ha sido insertado el usuario correctamente"});
							} else {
								res.json({ mensaje: "No se ha sido insertado el usuario comuniquese con el administrador"});
							}
						})
					}	
				});

			} else {
				res.json({ mensaje: "Faltan campos para el registro de usuario."});
			}

		} else {
			res.json({ mensaje: "Formato de email no válido, por favor ingrese un formato correcto."});
		}

	})
	
}