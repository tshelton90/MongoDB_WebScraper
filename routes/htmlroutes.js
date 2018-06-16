const express = require('express');
const db = require('../models');
const mongoos = require('mongoose');
const path = require('path')

//Routes
module.exports = (app) => {
    app.get('/', (req, res) => {
        db.Article.find({})
            .then( (dbArticles) => {
                res.render('index', {dbArticles});
            })
            .catch(function (err){
                return res.json(err);
            })
    });
}