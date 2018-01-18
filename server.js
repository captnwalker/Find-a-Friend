//Dependencies
var http = require("http");

var bodyParser = require('body-parser')

var path = require('path');

var PORT = process.env.PORT || 8080;

// Setting up Express Server
var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World!!!!!')
})
 

// BodyParser to sort JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Requires for local .js files
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// Start the server
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});