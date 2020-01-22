var express = require('express');

var app = express();
var port = process.env.PORT || 3000;


var apiController = require('./controllers/apiController');


apiController(app);

app.listen(3000); //crea el servidor y lo pone a escuchar en el puerto 3000