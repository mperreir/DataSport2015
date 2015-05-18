'use strict';

angular.module('hyblabApp')
  .factory('Data', function($q) {

    // Variables


    var dataPath;

    var csvParsed;

    var dataSlide1 = {
      'nomVille': '',
      'date': '',
      'distance': 0,
      'nbCoureurs': 0,
      'nbFemme': 0,
      'pourcentageFemme': 0,
      'nbHomme': 0,
      'pourcentageHomme': 0,
      'listeDepartement': {},
      'repartitionCatSexe': {
        'espoir': {},
        'junior': {},
        'senior': {},
        'veteran1': {},
        'veteran2': {},
        'veteran3': {},
        'veteran4': {},
        'veteran5': {}
      },
      'premier': 0,
      'dernier': 0,
    };


    var dataSlide2 = [{
      'nom': '',
      'prenom': '',
      'cat': '',
      'temps': 0,
      'sexe': ''
    }];

    //Fonctions utilitaires


    function setPourcentageFemme(Object) {
      var countF = 0;
      for (var i = 0; i < Object.data.length; i++) {
        if (Object.data[i].Sexe === 'F') {
          countF++;
        }
      }
      dataSlide1.nbFemme = countF;
      dataSlide1.pourcentageFemme = (countF / Object.data.length) * 100;
    }

    function setPourcentageHomme(Object) {
      var countH = 0;
      for (var i = 0; i < Object.data.length; i++) {
        if (Object.data[i].Sexe === 'M') {
          countH++;
        }
      }
      dataSlide1.nbHomme = countH;
      dataSlide1.pourcentageHomme = (countH / Object.data.length) * 100;
    }

    function getTempsMoyen(tab) {
      var temps = 0,
        count = 0;
      for (var i = 0; i < tab.length; i++) {
        if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0) {
          temps += parseInt(tab[i]['Nb.Secondes'], 10);
          count++;
        }
      }
      var tpsMoyen = temps / count;

      var secNum = parseInt(tpsMoyen, 10);
      var hours = Math.floor(secNum / 3600);
      var minutes = Math.floor((secNum - (hours * 3600)) / 60);
      var seconds = secNum - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      var time = hours + ':' + minutes + ':' + seconds;
      return time;
    }

    function getTempsPremier(tab) {
      var min = Infinity;
      for (var i = 0; i < tab.length; i++) {
        if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0 && parseInt(tab[i]['Nb.Secondes'], 10) < min) {
          min = parseInt(tab[i]['Nb.Secondes'], 10);
        }
      }
      return min;
    }

    function getTempsDernier(tab) {
      var max = 0;
      for (var i = 0; i < tab.length; i++) {
        if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0 && parseInt(tab[i]['Nb.Secondes'], 10) > max) {
          max = parseInt(tab[i]['Nb.Secondes'], 10);
        }
      }
      return max;
    }

    function setListDpt(tab) {
      for (var i = 0; i < tab.length; i++) {
        if (tab[i].Code.substring(0, 2) !== '') {
          var dpt = tab[i].Code.substring(0, 2);
          if (!dataSlide1.listeDepartement['FR-' + dpt]) {
            dataSlide1.listeDepartement['FR-' + dpt] = 0;
          }
          dataSlide1.listeDepartement['FR-' + dpt]++;
        }
      }
    }

    function estFemme(Object) {
      return Object.Sexe === 'F';
    }

    function estHomme(Object) {
      return Object.Sexe === 'M';
    }

    function estCatES(Object) {
      return Object['Abbrev. Catégorie'] === 'ES';
    }

    function estCatJU(Object) {
      return Object['Abbrev. Catégorie'] === 'JU';
    }

    function estCatSE(Object) {
      return Object['Abbrev. Catégorie'] === 'SE';
    }

    function estCatV1(Object) {
      return Object['Abbrev. Catégorie'] === 'V1';
    }

    function estCatV2(Object) {
      return Object['Abbrev. Catégorie'] === 'V2';
    }

    function estCatV3(Object) {
      return Object['Abbrev. Catégorie'] === 'V3';
    }

    function estCatV4(Object) {
      return Object['Abbrev. Catégorie'] === 'V4';
    }

    function estCatV5(Object) {
      return Object['Abbrev. Catégorie'] === 'V5';
    }

    function cptCatSexe(Object) {
      dataSlide1.repartitionCatSexe.espoir.femme = Object.filter(estCatES).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.espoir.homme = Object.filter(estCatES).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.junior.femme = Object.filter(estCatJU).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.junior.homme = Object.filter(estCatJU).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.senior.femme = Object.filter(estCatSE).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.senior.homme = Object.filter(estCatSE).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran1.homme = Object.filter(estCatV1).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran1.femme = Object.filter(estCatV1).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran2.homme = Object.filter(estCatV2).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran2.femme = Object.filter(estCatV2).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran3.homme = Object.filter(estCatV3).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran3.femme = Object.filter(estCatV3).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran4.homme = Object.filter(estCatV4).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran4.femme = Object.filter(estCatV4).filter(estFemme).length;
      dataSlide1.repartitionCatSexe.veteran5.homme = Object.filter(estCatV5).filter(estHomme).length;
      dataSlide1.repartitionCatSexe.veteran5.femme = Object.filter(estCatV5).filter(estFemme).length;
    }

    function formatage(tab) {
      for (var i = 0; i < tab.length; i++) {
        dataSlide2.push({
          'nom': tab[i].Nom,
          'prenom': tab[i].Prénom,
          'cat': tab[i]['Abbrev. Catégorie'],
          'temps': parseInt(tab[i]['Nb.Secondes'], 10),
          'sexe': tab[i].Sexe,
        });
      }
    }





    //Fonctions à retourner


    return {

      create: function(dataPath) {

        var deferred = $q.defer();


        csvParsed = new Papa.parse(dataPath, {
          download: true,
          delimiter: '\t',
          header: true,
          encoding: 'UTF8',
          skipEmptyLines: true,
          complete: function(results) {

            //Traitement section 1
            dataSlide1.distance = results.data[1].Distance;
            dataSlide1.nomVille = results.data[1]['Ville Compet.'];
            dataSlide1.date = results.data[1]['Date Compet.'];
            dataSlide1.nbCoureurs = results.data.length;
            setPourcentageHomme(results);
            setPourcentageFemme(results);
            setListDpt(results.data);
            dataSlide1.dernier = getTempsDernier(results.data);
            dataSlide1.premier = getTempsPremier(results.data);
            cptCatSexe(results.data);
            formatage(results.data);

            //Traitement section 2d

            //Le traitement est terminé (on ajoute du temps pour voir le loader)
            window.setTimeout(
              function() {
                deferred.resolve(this);
              }, 800);
          }

        });

        //On renvoit la promesse
        return deferred.promise;

      },

      getDataSlide1: function() {
        return dataSlide1;
      }

    };
  });
