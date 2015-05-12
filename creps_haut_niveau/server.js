var express = require('express');
var path = require('path');
var app = express();
var donnees = require('./data/liste.json');



var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var dir = (env === 'dev') ? 'src' : 'build';
// serve static content from the html directory
app.use(express.static(path.join(__dirname, dir)));

app.get('/api/all',function(req,res,next){
	res.json(donnees);
});

app.get('/api/females',function(req,res,next){
	var females = donnees.filter(function(personne){
		return personne.Sexe === 'F';
	});
	res.json(females);

});

app.get('/api/males',function(req,res,next){
	var males = donnees.filter(function(personne){
		return personne.Sexe === 'M';
	});
	res.json(males);

});


module.exports = app;