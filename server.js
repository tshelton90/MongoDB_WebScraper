var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
// Scraping tools
var cheerio = require("cheerio");

// var db = require('./models');
var PORT = process.env.port || 3000;

//Intialize Express
var app = express();

//Require Routes
// var routes = require('./routes')

// Set Handlebars
var exphbs = require("express-handlebars");
// Connect Handlebars
app.engine(
  "handelbars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/app/views/layoutes/"),
    partialsDir: path.join(__dirname, "/app/views/partials/")
  })
);
app.set("view engine", "handlebars");

// Static Content for the app from the public folder
app.use(express.static("public"));

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Deployed, using the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
