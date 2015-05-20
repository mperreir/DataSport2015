var express = require('express')
var app = express()


// create sub apps
var cg_44_comites_departementaux = require('./cg_44_comites_departementaux/server'); 
var cg_44_handi_sport = require('./cg_44_handi_sport/server'); 
var cr_ffme = require('./cr_ffme/server'); 
var creps_haut_niveau = require('./creps_haut_niveau/server'); 
var cros_sports_de_pleine_nature = require('./cros_sports_de_pleine_nature/server'); 
var marathon_nantes_facebook = require('./marathon_nantes_facebook/server'); 
var marathon_nantes_inscriptions = require('./marathon_nantes_inscriptions/server'); 
var ouest_france_running = require('./ouest_france_running/server'); 
var pratique_physique_universite_nantes = require('./pratique_physique_universite_nantes/server'); 
var presse_ocean_foot = require('./presse_ocean_foot/server'); 


// register sub-apps 
app.use('/cg_44_comites_departementaux',cg_44_comites_departementaux);
app.use('/cg_44_handi_sport',cg_44_handi_sport);
app.use('/cr_ffme',cr_ffme);
app.use('/creps_haut_niveau',creps_haut_niveau);
app.use('/cros_sports_de_pleine_nature',cros_sports_de_pleine_nature);
app.use('/marathon_nantes_facebook',marathon_nantes_facebook);
app.use('/marathon_nantes_inscriptions',marathon_nantes_inscriptions);
app.use('/ouest_france_running',ouest_france_running);
app.use('/pratique_physique_universite_nantes',pratique_physique_universite_nantes);
app.use('/presse_ocean_foot',presse_ocean_foot);


// redirect root page to Hyblab server
// app.use(/\/$/,function(req, res, next){
// 	res.redirect('http://www.hyblab.fr/evenements/hyblab-datajournalisme/');
// });


// launch app
var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Hyblab DataSport 2015 routing app listening at http://%s:%s', host, port)

})
