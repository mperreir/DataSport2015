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
    var dataSlide1 = {
      'nomVille' : '',
      'date' : '',
      'distance': 0,
      'nbCoureurs' : 0,
      'nbFemme': 0,
      'pourcentageFemme':0,
      'nbHomme': 0,
      'pourcentageHomme':0,
      'listeDepartement' : {},
      'repartitionCatSexe': {
        'espoir' : {},
        'junior' : {},
        'senior' : {},
        'veteran1' : {},
        'veteran2' : {},
        'veteran3' : {},
        'veteran4' : {},
        'veteran5' : {}
      },
      'premier' :0,
      'dernier' :0,
    };
    var dataSlide2 = [{
      'nom' : '',
      'prenom' : '',
      'cat' : '',
      'temps' : 0,
      'sexe' :''
    }];
    
    function pourcentageFemme(Object){
      var countF = 0;
        for(var i = 0; i<Object.data.length; i++){
          if(Object.data[i].Sexe === "F"){
            countF++;
          }
        }
      dataSlide1.nbFemme = countF;  
      return dataSlide1.pourcentageFemme = (countF/Object.data.length)*100;
    }
    
    function pourcentageHomme(Object){
      dataSlide1.nbHomme =  Object.data.length-(Object.data.length*pourcentageFemme(Object));
      return dataSlide1.pourcentageHomme = 100-pourcentageFemme(Object);
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
        }
      }
      var hours   = Math.floor(min / 3600);
      var minutes = Math.floor((min - (hours * 3600)) / 60);
      var seconds = min - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      min    = hours+':'+minutes+':'+seconds;
      return min;
    }
    
    function tempsDernier(tab){
      var max= 0;
      for(var i = 0; i<tab.length; i++){
        if(parseInt(tab[i]["Nb.Secondes"], 10) != 0 && parseInt(tab[i]["Nb.Secondes"], 10)>max){
          max = parseInt(tab[i]["Nb.Secondes"], 10);
        }
      }
      var hours   = Math.floor(max / 3600);
      var minutes = Math.floor((max - (hours * 3600)) / 60);
      var seconds = max - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      max    = hours+':'+minutes+':'+seconds;
      return max;
    }
    
    function listDpt(tab){
      for(var i = 0; i<tab.length; i++){
        if(tab[i]["Code"].substring(0,2)!=""){
          var dpt = tab[i]["Code"].substring(0,2);
          if(!dataSlide1.listeDepartement["FR-"+dpt]){
            dataSlide1.listeDepartement["FR-"+dpt] = 0;
          }
          dataSlide1.listeDepartement["FR-"+dpt]++;
        }
      }
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
    function catV5(Object){
      return Object["Abbrev. Catégorie"] =="V5";
    }
    
    function cptCatSexe(Object){
      dataSlide1.repartitionCatSexe.espoir.femme = Object.filter(catES).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.espoir.homme = Object.filter(catES).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.junior.femme = Object.filter(catJU).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.junior.homme = Object.filter(catJU).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.senior.femme = Object.filter(catSE).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.senior.homme = Object.filter(catSE).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran1.homme = Object.filter(catV1).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran1.femme = Object.filter(catV1).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran2.homme = Object.filter(catV2).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran2.femme = Object.filter(catV2).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran3.homme = Object.filter(catV3).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran3.femme = Object.filter(catV3).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran4.homme = Object.filter(catV4).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran4.femme = Object.filter(catV4).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran5.homme = Object.filter(catV5).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran5.femme = Object.filter(catV5).filter(estFemme).length;
    }
    
    
    var csvParsed = new Papa.parse(dataPath,{
      download : true,
      delimiter : '\t',
      header: true,
      encoding: 'UTF8',
      skipEmptyLines: true,
      complete: function(results) {
        console.log(results);
        
        dataSlide1.distance = results.data[1]["Distance"];
        dataSlide1.nomVille = results.data[1]["Ville Compet."];
        dataSlide1.date = results.data[1]["Date Compet."];
        dataSlide1.nbCoureurs = results.data.length;
        dataSlide1.pourcentageHomme = pourcentageHomme(results);
        dataSlide1.pourcentageFemme = pourcentageFemme(results);
        var tabES = (results.data).filter(catSE);
        var tabHomme = tabES.filter(estHomme);
        
        listDpt(results.data);
        dataSlide1.dernier = tempsDernier(results.data);
        dataSlide1.premier = tempsPremier(results.data);
        cptCatSexe(results.data);
        console.log(dataSlide1);
      }
    });
     
  });
