const express = require('express');
const db = require('../models');
const mongoose = require('mongoose');
const path = require('path')

//Routes
module.exports = function (app) {
    app.get('/', function (req, res) {
        db.articles.find({})
        .populate('comment')
            .then( function (dbarticles) {
                res.render('index', {dbarticles});
            })
            .catch(function (err){
                return res.json(err);
            })
    });

    //view saved articles
  app.get("/saved", function (req, res) {
    db.articles.find({saved: true})
    .populate("comment")
      .then(function (dbarticles) {
        res.render("saved", { dbarticles });
      })
      .catch(function (err) {
        return res.json(err);
      })
  });


  app.get("/app/public/assets/css/style.css", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/css/" + "style.css");
  });

  app.get("/app/public/assets/img/sd-logo.png", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/img/sd-logo.png");
  });

  app.get("/app/public/assets/js/main.js", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/js/main.js");
  });
};
