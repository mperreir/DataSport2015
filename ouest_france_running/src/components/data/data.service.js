'use strict';
angular.module('hyblabApp')
  .factory('Data', function($q, $rootScope) {
    /*-------------------------------------------------------*\
         Variable du service
    \*-------------------------------------------------------*/
    //Chemin relatif du fichier de données
    var dataPath;
    //Variable stockant le résultat du fichier parsé
    var csvParsed;
    //Promesse du chargement du fichier
    var promise;
    //Slide 1
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
    // Slide 2
    var dataSlide2 = [];
    // Slide 3
    var dataSlide3 = [];
    /*-------------------------------------------------------*\
         Fonctions utilitaires
    \*-------------------------------------------------------*/
    /**
     * Calcule le pourcentage de femmes
     * @param  {[array]} tableau en entrée
     */
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
      /**
       * Calcule le pourcentage d'hommes
       * @param  {[array]} tableau en entrée
       */
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
      /**
       * Récupère le temps moyen d'un jeu de données
       * @param  {[array]} tableau en entrée
       */
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
      /**
       * récupère le plus petit temps d'un tableau
       * @param  {[array]} tableau en entrée
       */
    function getTempsPremier(tab) {
        var min = Infinity;
        for (var i = 0; i < tab.length; i++) {
          if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0 && parseInt(tab[i]['Nb.Secondes'], 10) < min) {
            min = parseInt(tab[i]['Nb.Secondes'], 10);
          }
        }
        return min;
      }
      /**
       * Récupère le plus grand temps d'un jeu de données
       * @param  {[array]} tableau en entrée
       */
    function getTempsDernier(tab) {
        var max = 0;
        for (var i = 0; i < tab.length; i++) {
          if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0 && parseInt(tab[i]['Nb.Secondes'], 10) > max) {
            max = parseInt(tab[i]['Nb.Secondes'], 10);
          }
        }
        return max;
      }
      /**
       * Extrait la liste des départements des participants
       * @param  {[array]} tableau en entrée
       */
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
      /**
       * Filtre : récupère les femmes
       * @param  {[array]} tableau en entrée
       */
    function estFemme(Object) {
        return Object.Sexe === 'F';
      }
      /**
       * Filtre : récupère les hommes
       * @param  {[array]} tableau en entrée
       */
    function estHomme(Object) {
        return Object.Sexe === 'M';
      }
      // Filtres sur les catégories
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
      /**
       * Compte le nombre de coureurs par catégories
       * @param  {[array]} tableau en entrée
       */
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
      /**
       * Formate le tableau de données pour être utilisable en slide 2
       * @param  {[array]} tableau en entrée
       */
    function formatage(tab) {
        for (var i = 0; i < tab.length; i++) {
          if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0) {
            dataSlide2.push({
              'nom': tab[i].Nom,
              'prenom': tab[i].Prénom,
              'cat': tab[i]['Abbrev. Catégorie'],
              'temps': parseInt(tab[i]['Nb.Secondes'], 10),
              'sexe': tab[i].Sexe,
              'dossard': tab[i].Numéro
            });
          }
        }
      }
      /**
       * Filtre : récupère les temps non nuls
       * @param  {[array]} tableau en entrée
       */
    function isNotNul(Object) {
        return Object['Nb.Secondes'] !== 0;
      }
      /**
       * Renvoie les temps en secondes de la course
       * @param  {[array]} tableau en entrée
       */
    function recupTemps(tab) {
        var temp = [];
        for (var i = 0; i < tab.length; i++) {
          if (parseInt(tab[i]['Nb.Secondes'], 10) !== 0) {
            temp.push(parseFloat(tab[i]['Nb.Secondes']));
          }
        }
        temp.sort(function(a, b) {
          return a - b;
        });
        var tailleTab = temp.length;
        var ecart = temp[tailleTab - 1] - temp[0];
        var palier = Math.round(ecart / 15);
        var indicePalier = 1;
        var indiceTabPrec = 0;
        for (var j = 0; j < temp.length; j++) {
          if (temp[j] > palier * indicePalier) {
            dataSlide3[indicePalier - 1] = j - indiceTabPrec;
            indicePalier++;
            indiceTabPrec = j;
          }
        }
      }
      /*-------------------------------------------------------*\
           Fonctions à retourner
      \*-------------------------------------------------------*/
    return {
      /**
       * Génère les données de la visualisation
       * @param  {[string]} chemin des données
       * @return une promesse sur les données générées
       */
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
            //Traitement section 2
            formatage(results.data);
            //Traitement section 3
            recupTemps(results.data);
            //Le traitement est terminé (on ajoute du temps pour voir le loader)
            window.setTimeout(
              function() {
                deferred.resolve(this);
              }, 800);
          }
        });
        //On stocke et renvoie la promesse
        promise = deferred.promise;
        return deferred.promise;
      },
      getPromise: function() {
        return promise;
      },
      getDataSlide1: function() {
        return dataSlide1;
      },
      getDataSlide2: function() {
        return dataSlide2;
      },
      getDataSlide3: function() {
        return dataSlide3;
      },
      /**
       * Rééintialise les variables puis appelle create
       * @param  {[string]} chemin des données
       */
      switchData: function(dataPath) {
        // Reset des données
        dataSlide1 = {
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
        dataSlide2 = [];
        dataSlide3 = [];
        this.create(dataPath);
        $rootScope.$broadcast('Dataset switched');
      }
    };
  });
