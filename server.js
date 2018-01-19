// dependencies
var http = require("http");

var bodyParser = require('body-parser')

var path = require('path');

// setting up Express Server
var express = require('express');
var app = express();


app.get('/', function(req, res) {
    res.sendFile( path.resolve('app/public/home.html') );
});
 
// app.get('/', function (req, res) {
// });
//   res.send('Hello World!!!!!')

var PORT = process.env.PORT || 8080;

// bodyParser to sort JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//app.use(express.static(path.join(__dirname, './app/public')));
//res.sendFile('home.html', { root: path.join(__dirname, './app/public') });

// requires for local .js files
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// start the server
app.listen(PORT, function() {
	console.log("Zombie Friend Finder App is listening on PORT: " + PORT);
});