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

	app.post('/login', function(req, res) {

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

		  		const token = jwt.sign({ user_email: email }, config.llave, {
		   			expiresIn: 91440
		  		});

		  		res.json({
			   		mensaje: 'Autenticación correcta',
			   		token: token
		  		});

			} 

		});
	})

	app.post('/register', function(req, res) {

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

	app.get('/getTransactionHistory', function(req, res) {

	  var token = req.headers['x-access-token'];
	  if (!token) return res.status(401).send({ 
	  	auth: false, 
	  	message: 'No token provided.' 
	  });
	  
	  jwt.verify(token, config.llave, function(err, decoded) {
	    if (err) return res.status(500).send({ 
	    	auth: false, 
	    	message: 'Failed to authenticate token.' 
	    });

	    
	    var email = decoded['user_email'];
		var user_id = crypto.createHash('md5').update(email).digest("hex");
		//console.log(email, user_id);

		con.query("SELECT * from transaction where user_id='"+user_id+"' order by created_date desc", function(err, rows){
			if(err) throw err;
			if (rows.length==0) {
				res.json({ mensaje: "No posee transacciones." });
			} else {
				res.json({ transactions: rows });
			}
	  	});
	    
	  });
	});

	app.get('/getPoints', function(req, res) {
		
	  var token = req.headers['x-access-token'];
	  if (!token) return res.status(401).send({ 
	  	auth: false, 
	  	message: 'No token provided.' 
	  });
	  
	  jwt.verify(token, config.llave, function(err, decoded) {
	    if (err) return res.status(500).send({ 
	    	auth: false, 
	    	message: 'Failed to authenticate token.' 
	    });

	    
	    var email = decoded['user_email'];
		var user_id = crypto.createHash('md5').update(email).digest("hex");

		con.query("SELECT SUM(points) as sumapuntos FROM transaction where user_id='"+user_id+"' and status='1'", function(err, rows){
			if(err) throw err;
			if (rows.length==0) {
				res.json({ mensaje: "No posee puntos." });
			} else {
				res.json({ sumapuntos: rows });
			}
	  	});
	    
	  });
	});
	
}