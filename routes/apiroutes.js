const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');
const request = require('request');

const db = require('../models');

const app = express();

module.exports = (app) => {
    app.get('/articles', (req, res) => {
        db.Article.find({})
            .then((mongoHeadlines) => {
                return res.json(err);
            })
            .catch( (err) => {
                return res.json(err);
            })
    });

    app.put('/save', (req, res) => {
        db.Article.updateOne({_id: req.body.id}, { $set: { saved: true} })
        .then((updatedArticles) =>{
            res.json(updatedArticles);
        })
        .catch( (err) => {
            return res.json(err);
        })
    })

    app.put('/unsave', (req, res) => {
        db.Article.updateOne({_id: req.body.id }, {$set: { saved: false} })
        .then( (updatedArticles) => {
            res.json(updatedArticles);
        })
        .catch( (err) => {
            return res.json(err);
        })
    })

    app.get('/scape', (req, res) => {
        request('http://www.nba.com', (error, respons, html) => {

        let $ = cheerio.load(html);
        
        $('a.content_list--title').each( (i, element) {

            let result = {};

            result.link = 'http://www.gamespot.com' + $(element).attr('href');
            result.title = $(element).data('content_list--title')
            result.summary = $(element).children('h5').text();

            if(result.title) {
                db.Article.create(result)
                .then( (newArticle) => {
                    console.log(newArticle)
                })
                .catch( (err) => {
                    return res.json(err);
                })
            };
        });
        });
        res.redirect('/');
    });
}