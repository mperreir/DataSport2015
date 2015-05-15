/**
 * Conntrolleur de la route racine (/)
 * Nommé ici MainCtrl
 * (Ce n'est pas le controlleur principal, mais juste le controleur associé à la route /)
 */

'use strict';

angular.module('hyblabApp')
  .controller('MainCtrl', function() {
    
    //Recupération des données
    var dataPath = "../../assets/data/25km.csv";
    var csv = new Papa.parse(dataPath,{
      download : true,
      delimiter : '    ',
      header: true,
      encoding: 'UTF8',
      skipEmptyLines: true,
      complete: function(results) { console.log(results); }
    });

    // Vide pour l'instant

  });
