var express = require('express');
var path = require('path');
var app = express();

// serve static content from the html directory
app.use(express.static(path.join(__dirname, 'html')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/json', express.static(path.join(__dirname, 'json')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/font', express.static(path.join(__dirname, 'font')));

module.exports = app;