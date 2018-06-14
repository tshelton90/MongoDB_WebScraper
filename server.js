var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Scraping tools
var cheerio = require('cheerio');

var db = require('/models');

//Intialize Express
var app = express();

// Static Content for the app from the public folder
app.use(express.static("public"))

//parse application/json
app.use(bodyParser.urlecoded({ extended: true}));

// Deployed, using the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
