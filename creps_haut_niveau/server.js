var express = require('express');
var path = require('path');
var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var dir = (env === 'dev') ? 'src' : 'build';
var credits = require('./data/credits');

// serve static content from the html directory
app.use(express.static(path.join(__dirname, dir)));

app.get('/api/credits/', function(req, res, next){
  res.json(credits);
});

app.get('/api/females/', function(req, res, next){
  var category = req.query.category || false;

  var females = donnees.filter(function(person){

  });
});

module.exports = app;