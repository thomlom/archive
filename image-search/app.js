const path = require('path');
const express = require('express');
const hbs = require('hbs');
const mongodb = require('mongodb')
const Search = require('bing.search');

var app = express();
var port = (process.env.PORT || '3000');

var MongoClient = mongodb.MongoClient;
var URL_DB = process.env.IMAGE_SEARCH_URL

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('index', {
        title: "Image Search"
    })
});

app.get('/search/:searchQuery', function(req, res) {
    MongoClient.connect(URL_DB, function(err, db) {
        if (err) throw err;
        var imageDB = db.collection('image');
        var nbResults = req.query.offset || 5;
        var search = new Search(process.env.ACCOUNT_KEY);
        search.images(req.params.searchQuery, {
            top: nbResults
        }, function(err, results) {
            results.map(function(element) {
                delete element.width;
                delete element.height;
                delete element.displayUrl;
                delete element.thumbnail;
                delete element.id;
                delete element.size;
                delete element.type;
                return element;
            })
            res.json(results);
        })
        var history = {
            term: req.params.searchQuery,
            date: new Date()
        }
        imageDB.insert(history, function(err, docs) {
            db.close();
        })
    })
});

app.get('/latest', function(req, res) {
    MongoClient.connect(URL_DB, function(err, db) {
        if (err) throw err;
        var imageDB = db.collection('image');
        var latest = imageDB.find().sort({_id:-1}).limit(10).toArray(function(err, result) {
            result.map(function(element) {
                delete element._id;
                return element;
            })
            res.json(result)
        })
        db.close()
    })
})

app.listen(port)
