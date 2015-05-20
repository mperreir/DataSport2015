var express = require('express');
var path = require('path');
var app = express();
var donnees = require('./data/liste.json');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var dir = (env === 'dev') ? 'src' : 'build';
var credits = require('./data/credits');

app.use(express.static(path.join(__dirname, dir)));

/**
* A renvoyer :
* - count total
* - count majeur / mineur
* - count homme / femme
*/
app.get('/api/region/', function(req, res, next){
  var toSend = {
    total: donnees.length,
    hautNiveau: {
      total: 0,
      underage: 0
    },
    espoirs: {
      total: 0,
      underage: 0
    },
    partenaires: 0
  };

  var today = Date.now();

  donnees.forEach(function(person){
    var category = person['Catégorie'];
    var birthDateStr = person['Date de naissance'];
    var day = birthDateStr.substr(0, 2);
    var month = birthDateStr.substr(3, 2);
    var year = birthDateStr.substr(6);

    var fullDate = month + '/' + day + '/' + year;
    var birthDate = new Date(fullDate);
    var datediff = today - birthDate;
    var age = datediff / (24 * 60 * 60 * 1000 * 365);

    if(isHautNiveau(category)){
      toSend.hautNiveau.total++;
      if(age < 18) toSend.hautNiveau.underage++;
    }
    else if(category === 'Espoirs'){
      toSend.espoirs.total++;
      if(age < 18) toSend.espoirs.underage++;
    }
    else if(category === 'Partenaire d entrainement' || category === 'Reconversion') toSend.partenaires++;
  });

  res.json(toSend);
});

app.get('/api/departements/', function(req, res, next){
  var toSend = {
    '44': {
      total: 0,
      age: {
        espoirs: 0,
        hautNiveau: 0
      }
    },
    '49': {
      total: 0,
      age: {
        espoirs: 0,
        hautNiveau: 0
      }
    },
    '53': {
      total: 0,
      age: {
        espoirs: 0,
        hautNiveau: 0
      }
    },
    '72': {
      total: 0,
      age: {
        espoirs: 0,
        hautNiveau: 0
      }
    },
    '85': {
      total: 0,
      age: {
        espoirs: 0,
        hautNiveau: 0
      }
    }
  };

  var sportsObj44 = {};
  var sportsObj49 = {};
  var sportsObj53 = {};
  var sportsObj72 = {};
  var sportsObj85 = {};
  var today = Date.now();
  var rx = /Fédération\sFrançaise\s(d)*(e )*(')*(u )*/g;

  donnees.forEach(function(person){
    var category = person['Catégorie'];
    if(!isHautNiveau(category) && category !== 'Espoirs') return;

    var dpt = person['Code département'];
    var federation = person['Fédération'];
    var sportsObj;
    toSend[dpt].total++;
    if(dpt === 44) {
      sportsObj = sportsObj44;      
    }
    else if(dpt === 49) {
      sportsObj = sportsObj49;
    }
    else if(dpt === 53) {
      sportsObj = sportsObj53;
    }
    else if(dpt === 72) {
      sportsObj = sportsObj72;
    }
    else if(dpt === 85) {
      sportsObj = sportsObj85;
    }

    sportsObj[federation] = sportsObj[federation] || {
      name: federation.replace(rx, ''),
      federation: federation,
      icon: 'assets/img/sports/' + federation.replace(/\s+/g, '-').toLowerCase() + '_bleu.svg',
      total: 0
    };

    var birthDateStr = person['Date de naissance'];
    var day = birthDateStr.substr(0, 2);
    var month = birthDateStr.substr(3, 2);
    var year = birthDateStr.substr(6);

    var fullDate = month + '/' + day + '/' + year;
    var birthDate = new Date(fullDate);
    var datediff = today - birthDate;
    var age = datediff / (24 * 60 * 60 * 1000 * 365);

    if(age < 18){
      if(category === 'Espoirs'){
        toSend[dpt].age.espoirs++;
      }
      else {
        toSend[dpt].age.hautNiveau++;
      }
    }

    sportsObj[federation].total++;
  });

  var sportsArr44 = [];
  var sportsArr49 = [];
  var sportsArr53 = [];
  var sportsArr72 = [];
  var sportsArr85 = [];

  for(index in sportsObj44){
    sportsArr44.push(sportsObj44[index]);
  }

  for(index in sportsObj49){
    sportsArr49.push(sportsObj49[index]);
  }

  for(index in sportsObj53){
    sportsArr53.push(sportsObj53[index]);
  }

  for(index in sportsObj72){
    sportsArr72.push(sportsObj72[index]);
  }

  for(index in sportsObj85){
    sportsArr85.push(sportsObj85[index]);
  }

  function sortArray(a, b){
    if(a.total < b.total) return 1;
    else return -1;
  }

  sportsArr44.sort(sortArray);
  sportsArr49.sort(sortArray);
  sportsArr53.sort(sortArray);
  sportsArr72.sort(sortArray);
  sportsArr85.sort(sortArray);

  toSend['44'].sports = sportsArr44.slice(0, 3);
  toSend['49'].sports = sportsArr49.slice(0, 3);
  toSend['53'].sports = sportsArr53.slice(0, 3);
  toSend['72'].sports = sportsArr72.slice(0, 3);
  toSend['85'].sports = sportsArr85.slice(0, 3);

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
      icon: 'assets/img/sports/' + icon + '_hf.svg',
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

  // Object.keys(sportsObj).forEach(function(index){
  //   sportsArr.push(sportsObj[index]);
  // });

  // var sorted = sportsArr.sort(function(a, b){
  //   var totalA = a.espoirs.males
  //     + a.espoirs.females
  //     + a.hautNiveau.males
  //     + a.hautNiveau.females;

  //   var totalB = b.espoirs.males
  //     + b.espoirs.females
  //     + b.hautNiveau.males
  //     + b.hautNiveau.females;

  //   if(totalA > totalB) return -1;
  //   else return 1;
  // });
  // 
  sportsArr.push(sportsObj['Fédération Française de Natation']);
  sportsArr.push(sportsObj['Fédération Française de Judo-Jujitsu Kendo et Disciplines Associées']);
  sportsArr.push(sportsObj['Fédération Française de Gymnastique']);
  
  sportsArr.push(sportsObj['Fédération Française de Volley-Ball']);
  sportsArr.push(sportsObj['Fédération Française de Handball']);
  sportsArr.push(sportsObj['Fédération Française de Basketball']);

  sportsArr.push(sportsObj['Fédération Française de Cyclisme']);
  sportsArr.push(sportsObj['Fédération Française de Canoë-Kayak']);
  sportsArr.push(sportsObj['Fédération Française des Sociétés d\'Aviron']);

  // toSend.sports = sorted.slice(0, count);
  toSend.sports = sportsArr;
  res.json(toSend);
});

app.get('/api/credits/', function(req, res, next){
  res.json(credits);
});

module.exports = app;

function isHautNiveau(niveau){
  return niveau.toLowerCase() === 'sénior' || niveau.toLowerCase() === 'jeune' || niveau.toLowerCase() === 'elite';
}