const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');
const request = require('request');
const axios = require("axios");

const db = require('../models');

const app = express();

module.exports = (app) => {
    app.get('/articles', function(req, res) {
        db.Article.find({})
            .then((mongoHeadlines) => {
                return res.json(err);
            })
            .catch( (err) => {
                return res.json(err);
            })
    });

    app.put('/save', function(req, res) {
        db.Article.updateOne({_id: req.body.id}, { $set: { saved: true} })
        .then((updatedArticles) =>{
            res.json(updatedArticles);
        })
        .catch( (err) => {
            return res.json(err);
        })
    })

    app.put('/unsave', function(req, res) {
        db.Article.updateOne({_id: req.body.id }, {$set: { saved: false} })
        .then( (updatedArticles) => {
            res.json(updatedArticles);
        })
        .catch( (err) => {
            return res.json(err);
        })
    })

    app.get('/articles/:id', function(req, res) {
        db.Article.findOne({ _id: req.params.id})
        .populate('comment')
        .then((dbArticles) => {
            res.json(dbArticles);
        }).catch((err) => {
            return res.json(err);
        })
    });

    app.put('/comment/:id', function(res, res) {
        console.log(req.params.id)
        db.Comment.findOneAndUpdate({_id: req.params.id}, { $set: { title: req.body.title, body: req.body.body} })
        .then((updatedComment) => {
            console.log("line 59: " + updatedComment);
        res.json(updatedComment);
        }).catch((err) => {
            return res.json(err);
        })
    });

    app.post("/articles/:id", function (req, res) {
        db.Comment.create(req.body)
          .then(function (newComment) {
            // View the added result in the console
            console.log(newComment);
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: newComment._id }, { new: true });
    
          })
          .then(function (addedComment) {
            res.redirect("/");
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      })

    app.get('/scrape', function(req, res) {
        request("https://www.nhl.com/", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Empty array to save our scraped data
  var results = {};

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("h4.headline-link").each(function(i, element) {

    // Save the text of the h4-tag as "title"
    var title = $(element).text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var link = $(element).parent().attr("href");

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title,
      link: link
    });
  });

  // After looping through each h4.headline-link, log the results
  if(title){
      articlesArray.push(result);
  };
});
    console.log(articlesArray);
    db.Article.create(articlesArray)
        .then((newArticles) => {
            console.log(newArticles)
            res.json(newArticles)
        }).catch( (err) => {
            return res.json(err);
        })
        // request('http://www.nba.com', (error, respons, html) => {

        // let $ = cheerio.load(html);

        // $('a.content_list--title').each( (i, element) {

        //     let result = {};

        //     result.link = 'http://www.gamespot.com' + $(element).attr('href');
        //     result.title = $(element).data('content_list--title')
        //     result.summary = $(element).children('h5').text();

        //     if(result.title) {
        //         db.Article.create(result)
        //         .then( (newArticle) => {
        //             console.log(newArticle)
        //         })
        //         .catch( (err) => {
        //             return res.json(err);
        //         })
        //     };
        // });
        // });
    });
}