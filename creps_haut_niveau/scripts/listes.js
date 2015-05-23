var dt = require('../data/liste');
var count = 0;

dt.forEach(function(person){
  var category = person['Catégorie'];
  var sport = person['Fédération'];

  if((category === 'Sénior' || category === 'Jeune' || category === 'Elite') && sport=== 'Fédération Française d\'Athlétisme') count++;
});

console.log(count);