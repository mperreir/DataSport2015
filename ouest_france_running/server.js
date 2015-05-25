var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'src')));

//module.exports = app;
var server = app.listen(8080);
