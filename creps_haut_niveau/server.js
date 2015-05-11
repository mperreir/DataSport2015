var express = require('express');
var path = require('path');
var app = express();


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var dir = (env === 'dev') ? 'src' : 'build';
// serve static content from the html directory
app.use(express.static(path.join(__dirname, dir)));

module.exports = app;