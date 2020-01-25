var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

//Alfredo González - alfredogon82@yahoo.com 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var apiController = require('./controllers/apiController');

apiController(app);

app.listen(3000); //crea el servidor y lo pone a escuchar en el puerto 3000