/**
 * Conntrolleur de la route racine (/)
 * Nommé ici MainCtrl
 * (Ce n'est pas le controlleur principal, mais juste le controleur associé à la route /)
 */

'use strict';

angular.module('hyblabApp')
  .controller('MainCtrl', function() {
    var wow = new WOW().init();
    
    var dataPath = "../../assets/data/25km.csv";
    var listDepartement = {};
    var dataSlide1= {
      'nomVille' : '',
      'date' : '',
      'distance': 0,
      'nbCoureurs' : 0,
      'nbFemme': 0,
      'nbHomme': 0,
      'listDepartement' : {},
      'premier' :0,
      'dernier' :0,
    }
    
    function pourcentageFemme(Object){
      var countF = 0;
        for(var i = 0; i<Object.data.length; i++){
          if(Object.data[i].Sexe === "F"){
            countF++;
          }
        }
      return dataSlide1.nbFemme = (countF/Object.data.length)*100;
    };
    
    function pourcentageHomme(Object){
      return dataSlide1.nbHomme = 100-pourcentageFemme(Object);
    }
    
    function tempsMoyen(tab){
      var temps = 0, count = 0;
      for(var i = 0; i<tab.length; i++){
        if(parseInt(tab[i]["Nb.Secondes"], 10) != 0){
            temps +=parseInt(tab[i]["Nb.Secondes"], 10); 
            count++;
        }
      }
      var tpsMoyen = temps/count;
      
      var sec_num = parseInt(tpsMoyen, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time    = hours+':'+minutes+':'+seconds;
      return time;
    }
    
    function tempsPremier(tab){
      var min= Infinity;
      for(var i = 0; i<tab.length; i++){
        if(parseInt(tab[i]["Nb.Secondes"], 10) != 0 && parseInt(tab[i]["Nb.Secondes"], 10)<min){
          min = parseInt(tab[i]["Nb.Secondes"], 10);
          console.log(min);
        }
      }
      var hours   = Math.floor(min / 3600);
      var minutes = Math.floor((min - (hours * 3600)) / 60);
      var seconds = min - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var min    = hours+':'+minutes+':'+seconds;
      return min;
    }
    
    function listDpt(tab){
      for(var i = 0; i<tab.length; i++){
        if(tab[i]["Code"].substring(0,2)!=""){
          var dpt = tab[i]["Code"].substring(0,2)
          if(!dataSlide1.listDepartement["FR-"+dpt]){
            dataSlide1.listDepartement["FR-"+dpt] = 0;
          }
          dataSlide1.listDepartement["FR-"+dpt]++;
        }
      }
      console.log(dataSlide1.listDepartement);
    }
    
    function estFemme(Object){
      return Object.Sexe =="F";
    }
    function estHomme(Object){
      return Object.Sexe =="M";
    }
    function catES(Object){
      return Object["Abbrev. Catégorie"] =="ES";
    }
    function catJU(Object){
      return Object["Abbrev. Catégorie"] =="JU";
    }
    function catSE(Object){
      return Object["Abbrev. Catégorie"] =="SE";
    }
    function catV1(Object){
      return Object["Abbrev. Catégorie"] =="V1";
    }
    function catV2(Object){
      return Object["Abbrev. Catégorie"] =="V2";
    }
    function catV3(Object){
      return Object["Abbrev. Catégorie"] =="V3";
    }
    function catV4(Object){
      return Object["Abbrev. Catégorie"] =="V4";
    }
    
    
    var csvParsed = new Papa.parse(dataPath,{
      download : true,
      delimiter : '\t',
      header: true,
      encoding: 'UTF8',
      skipEmptyLines: true,
      complete: function(results) {
        console.log(results);
        console.log("nombre participants : "+results.data.length);
        console.log("pourcentage d'hommes : "+pourcentageHomme(results));
        //console.log(pourcentageFemme(results));
        console.log(tempsMoyen(results.data));
        var tabFemme = (results.data).filter(estFemme);
        var tabHomme = (results.data).filter(estHomme);
        var tabFSE = tabFemme.filter(catSE);
        listDpt(results.data);
        console.log("premier : "+tempsPremier(results.data));
        
      }
    });
     
  });
