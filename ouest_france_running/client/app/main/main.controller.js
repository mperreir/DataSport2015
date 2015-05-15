/**
 * Conntrolleur de la route racine (/)
 * Nommé ici MainCtrl
 * (Ce n'est pas le controlleur principal, mais juste le controleur associé à la route /)
 */

'use strict';

angular.module('hyblabApp')
  .controller('MainCtrl', function() {
    
    //Recupération des données
    var csv = new CSV('../assets/data/25km.csv',
    {
      header : true,
      cellDelimiter : ' '
    });
    var csvParsed = csv.parse();
    console.log(../assets/data/25km.csv);

    // Vide pour l'instant

  });
