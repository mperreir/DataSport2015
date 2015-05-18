/**
 * Conntrolleur de la route racine (/)
 * Nommé ici MainCtrl
 * (Ce n'est pas le controlleur principal, mais juste le controleur associé à la route /)
 */

'use strict';

angular.module('hyblabApp')
  .controller('MainCtrl', function() {
    
    //Recupération des données
    var dataPath = "../../assets/data/45km.csv";
    
    function pourcentageFemme(Object){
      var countH = 0;
        for(var i = 0; i<Object.data.length; i++){
          if(Object.data[i].Sexe === "F"){
            countH++;
          }
        }
      return (countH/Object.data.length)*100;
    };
    
    function pourcentageHomme(Object){
      return 100-pourcentageFemme(Object);
    }
    
    function tempsMoyen(Object){
      var temps = 0, count = 0;
      for(var i = 0; i<Object.data.length; i++){
        if(Object.data[i]["Nb.Secondes"] != "000000"){
            temps +=parseInt(Object.data[i]["Nb.Secondes"], 10); 
            count++;
        }
      }
      tempsMoyen = temps/count;
      
      var sec_num = parseInt(tempsMoyen, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time    = hours+':'+minutes+':'+seconds;
      return time;
    }
    
    var csvParsed = new Papa.parse(dataPath,{
      download : true,
      delimiter : '\t',
      header: true,
      encoding: 'UTF8',
      skipEmptyLines: true,
      complete: function(results) {
        console.log(results);
        console.log(results.data.length);
        console.log(pourcentageHomme(results));
        console.log(pourcentageFemme(results));
        console.log(tempsMoyen(results));
      }
    });
     
  });
