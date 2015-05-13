var express = require('express');
var path = require('path');
var app = express();
var donnees = require('./data/liste.json');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var dir = (env === 'dev') ? 'src' : 'build';
var credits = require('./data/credits');

app.use(express.static(path.join(__dirname, dir)));

app.get('/api/all',function(req,res,next){
	res.json(donnees);
});

app.get('/api/females',function(req,res,next){
  var filterArray = (req.query.category && req.query.category.split(',')) || false;
	var females = donnees.filter(function(personne){
    var selected = true;
    if(filterArray){
      var isFiltered = false;
      filterArray.forEach(function(filter){
        isFiltered = isFiltered || (personne['Catégorie'] === filter);
      });
      selected = isFiltered;
    }
		return selected && (personne.Sexe === 'F');
	});
	res.json(females);
});

app.get('/api/males',function(req,res,next){
	var filterArray = (req.query.category && req.query.category.split(',')) || false;
  var males = donnees.filter(function(personne){
    var selected = true;
    if(filterArray){
      var isFiltered = false;
      filterArray.forEach(function(filter){
        isFiltered = isFiltered || (personne['Catégorie'] === filter);
      });
      selected = isFiltered;
    }
    return selected && (personne.Sexe === 'M');
  });
  res.json(males);
});

/**
* A renvoyer :
* - count total
* - count majeur / mineur
* - count homme / femme
*/
app.get('/api/region/', function(req, res, next){
  var toSend = {
    total: 0,
    gender: {
      males: 0,
      females: 0
    },
    age: {
      underage: 0,
      adult: 0
    }
  };

  var today = Date.now();

  donnees.forEach(function(person){
    var category = person['Catégorie'];
    var gender = person['Sexe'] === 'M' ? 'males' : 'females';
    if(!isHautNiveau(category)) return;

    toSend.total++;
    toSend.gender[gender]++;
    var birthDateStr = person['Date de naissance'];
    var day = birthDateStr.substr(0, 2);
    var month = birthDateStr.substr(3, 2);
    var year = birthDateStr.substr(6);

    var fullDate = month + '/' + day + '/' + year;
    var birthDate = new Date(fullDate);
    var datediff = today - birthDate;
    var age = datediff / (24 * 60 * 60 * 1000 * 365);
    if(age > 18) toSend.age.adult++;
    else toSend.age.underage++;
  });

  res.json(toSend);
});

app.get('/api/status/', function(req, res, next){
  var count = req.query.count || 10;
  var toSend = {
    total: {
      espoirs: {
        males: 0,
        females: 0
      },
      hautNiveau: {
        males: [],
        females: []
      }
    }
  };
  var sportsObj = {};
  var sportsArr = [];

  donnees.forEach(function(person){
    var category = person['Catégorie'];
    var federation = person['Fédération'];
    var gender = (person['Sexe'] === 'M') ? 'males' : 'females';
    var icon = federation.replace(/\s+/g, '-').toLowerCase();

    sportsObj[federation] = sportsObj[federation] || {
      name: federation,
      icon: 'assets/img/sports/' + icon + '.svg',
      espoirs: {
        males: 0,
        females: 0
      },
      hautNiveau: {
        males: 0,
        females: 0
      }
    };

    if(category === 'Espoirs'){
      toSend.total.espoirs[gender]++;
      sportsObj[federation].espoirs[gender]++;
    }
    else if(isHautNiveau(category)){
      toSend.total.hautNiveau[gender]++;
      sportsObj[federation].hautNiveau[gender]++;
    }
  });

  Object.keys(sportsObj).forEach(function(index){
    sportsArr.push(sportsObj[index]);
  });

  var sorted = sportsArr.sort(function(a, b){
    var totalA = a.espoirs.males
      + a.espoirs.females
      + a.hautNiveau.males
      + a.hautNiveau.females;

    var totalB = b.espoirs.males
      + b.espoirs.females
      + b.hautNiveau.males
      + b.hautNiveau.females;

    if(totalA > totalB) return -1;
    else return 1;
  });

  toSend.sports = sorted.slice(0, count);
  res.json(toSend);
});

app.get('/api/credits/', function(req, res, next){
  res.json(credits);
});

module.exports = app;

function isHautNiveau(niveau){
  return niveau.toLowerCase() === 'sénior' || niveau.toLowerCase() === 'jeune' || niveau.toLowerCase() === 'elite';
}