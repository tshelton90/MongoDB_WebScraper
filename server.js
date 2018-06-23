var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
// Scraping tools
var cheerio = require("cheerio");
var request = require('request');

// var db = require('./models');
var PORT = process.env.port || 8080;

//Intialize Express
var app = express();

// Set Handlebars
var exphbs = require("express-handlebars");
// Connect Handlebars
app.engine(
  "handelbars",
  exphbs({
    defaultLayout: "main",
    ayoutsDir: path.join(__dirname, "/app/views/layouts/"),
    partialsDir: path.join(__dirname, "/app/views/partials/")
  })
);
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, "/app/views"));

// Static Content for the app from the public folder
app.use(express.static("public"));

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import routes and give server access to them
require('./app/routes/apiroutes')(app);
require('./app/routes/htmlroutes')(app);


// Deployed, using the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
