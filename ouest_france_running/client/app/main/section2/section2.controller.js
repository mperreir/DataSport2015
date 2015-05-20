/**
 * Controlleur interne à la section 2
 *
 */

'use strict';




angular.module('hyblabApp')
  .controller('Section2Ctrl', function($scope) {



    /*************************************************************************************************/
    /****************Récupération, traitement et préparation des données******************************/
    /*************************************************************************************************/





    $scope.tabGenres = {
      'M': 'active',
      'F': 'active'
    };

    $scope.tabCat = {
      'ES': 'active',
      'JU': 'active',
      'SE': 'active',
      'V1': 'active',
      'V2': 'active',
      'V3': 'active',
      'V4': 'active'
    };

    /**
     * Gère le clic sur un genre
     * @param  {[string]} id
     */
    $scope.clicGenre = function(id) {
      if ($scope.tabGenres[id] === 'active') {
        $scope.tabGenres[id] = '';
      } else {
        $scope.tabGenres[id] = 'active';
      }
      console.log('Genre mofifié : ' + id + '. Valeur actuelle : ' + $scope.tabGenres[id] + $scope.nbCoureursSlide2 + 'Coureurs');
      updateTab();
      console.log(tableauActuel);
    };

    function isNotGenre(genre) {
      return function(Object) {
        return Object.sexe !== genre;
      };
    }



    /**
     * Gère le clic sur une catégorie
     * @param  {[string]} id
     */
    $scope.clicCat = function(id) {
      if ($scope.tabCat[id] === 'active') {
        $scope.tabCat[id] = '';
      } else {
        $scope.tabCat[id] = 'active';
      }
      console.log('Catégorie modifiée : ' + id + '. Valeur actuelle : ' + $scope.tabCat[id] + $scope.nbCoureursSlide2 + 'Coureurs');
      updateTab();
      console.log(tableauActuel);
    };


    function isNotCat(cat) {
      return function(Object) {
        return Object.cat !== cat;
      };
    }



    var updateTab = function() {
      var tableauTemp = tableauEntier;
      for (var keyGenre in $scope.tabGenres) {
        if ($scope.tabGenres[keyGenre] === '') {
          tableauTemp = tableauTemp.filter(isNotGenre(keyGenre));
        }
      }
      for (var keyCat in $scope.tabCat) {
        if ($scope.tabCat[keyCat] === '') {
          tableauTemp = tableauTemp.filter(isNotCat(keyCat));
        }
      }
      tableauActuel = tableauTemp;
      $scope.first = getFirst(tableauActuel);
      $scope.second = getSecond(tableauActuel);
      $scope.third = getThird(tableauActuel);

      $scope.tempsFirst = $scope.first.temps.toHHMMSS();
      $scope.tempsSecond = $scope.second.temps.toHHMMSS();
      $scope.tempsThird = $scope.third.temps.toHHMMSS();

      $scope.last = plusLent(tableauActuel);
      $scope.mean = tempsMoyen(tableauActuel);
      $scope.nbCoureursSlide2 = tableauActuel.length;
      Diagram1 = new Chart(document.getElementById('dv5-1').getContext('2d')).HorizontalBar(getData1(), options);
      Diagram2 = new Chart(document.getElementById('dv5-2').getContext('2d')).HorizontalBar(getData2(), options);
      Diagram3 = new Chart(document.getElementById('dv5-3').getContext('2d')).HorizontalBar(getData3(), options);
    };



    var tableauEntier = _.sortBy($scope.dataSlide2, 'temps');
    var tableauActuel = tableauEntier;




    var getFirst = function(tab) {
      return tab[0];
    };
    var getSecond = function(tab) {
      return tab[1];
    };
    var getThird = function(tab) {
      return tab[2];
    };

    var plusRapide = function(tab) {
      return tab[0].temps;
    };
    var plusLent = function(tab) {
      return tab[tab.length - 1].temps;
    };
    var tempsMoyen = function(tab) {

      var temps = tab.map(function(item) {
        return item.temps;
      });
      var sommeTemps = Math.round(temps.reduce(function(previousValue, currentValue, index, array) {
        return previousValue + currentValue;
      }));

      return sommeTemps / tab.length;
    };


    $scope.first = getFirst(tableauActuel);
    $scope.second = getSecond(tableauActuel);
    $scope.third = getThird(tableauActuel);


    $scope.tempsFirst = $scope.first.temps.toHHMMSS();
    $scope.tempsSecond = $scope.second.temps.toHHMMSS();
    $scope.tempsThird = $scope.third.temps.toHHMMSS();


    $scope.last = plusLent(tableauActuel);
    $scope.mean = tempsMoyen(tableauActuel);
    $scope.nbCoureursSlide2 = tableauActuel.length;

    console.log(tableauEntier);


    /**************************************************************************************************/
    /**********************************Création de la dataviz******************************************/
    /*************************************************************************************************/

    console.log('Chargement du controlleur section2');

    var getData1 = function() {
      return {
        labels: ['Plus rapide  '],
        datasets: [{
          fillColor: '#6c6c65',
          strokeColor: '#6c6c65',
          data: [$scope.first.temps]
        }]
      };
    };
    var getData2 = function() {
      return {
        labels: ['Moyenne     '],
        datasets: [{
          fillColor: '#86867e',
          strokeColor: '#86867e',
          data: [$scope.mean]
        }]
      };
    };
    var getData3 = function() {
      return {
        labels: ['Plus lent      '],
        datasets: [{
          fillColor: '#9f9f98',
          strokeColor: '#9f9f98',
          data: [$scope.last]
        }]
      };
    };

    var getData4 = function(temps) {
      return {
        labels: ['Votre temps'],
        datasets: [{
          fillColor: 'rgba(231,55,84,1)',
          strokeColor: 'rgba(231,55,84,1)',
          data: [temps]
        }]
      };
    };




    var options = {
      scaleShowLabels: false,
      barShowStroke: false,
      animationStartWithDataset: 1,
      animationStartWithData: 1,
      animationSteps: 100,
      canvasBorders: false,
      graphTitle: '',
      legend: false,
      inGraphDataShow: true,
      inGraphDataTmpl: '<%= v3.toHHMMSS() %>',
      inGraphDataFontFamily: 'sans-serif',
      inGraphDataFontSize: 14,
      inGraphDataFontColor: '#222',
      annotateDisplay: false,
      scaleShowGridLines: false,
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: $scope.last / 4,
      scaleFontFamily: 'sans-serif',
      scaleFontSize: 16,
      scaleFontColor: '#222',
      scaleStartValue: 0,
      dynamicDisplay: true,
      responsive: true
    };

    var Diagram1 = new Chart(document.getElementById('dv5-1').getContext('2d')).HorizontalBar(getData1(), options);
    var Diagram2 = new Chart(document.getElementById('dv5-2').getContext('2d')).HorizontalBar(getData2(), options);
    var Diagram3 = new Chart(document.getElementById('dv5-3').getContext('2d')).HorizontalBar(getData3(), options);
    var Diagram4 = new Chart(document.getElementById('dv5-4').getContext('2d')).HorizontalBar(getData4(1000), options);




    String.prototype.toHHMMSS = function() {
      var secNum = parseInt(this, 10); // don't forget the second param
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
    };

    Number.prototype.toHHMMSS = function() {
      var secNum = parseInt(this, 10); // don't forget the second param
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
    };



    $scope.search = function(dossard) {
      $scope.erreurRecherche = false;
      var result = _.find($scope.dataSlide2, {
        'dossard': dossard
      });
      if (result) {
        $scope.connected = true;
        Diagram4 = new Chart(document.getElementById('dv5-4').getContext('2d')).HorizontalBar(getData4(result.temps), options);


      } else {
        // on renvoie une erreur
        $scope.erreurRecherche = true;

      }
    };





  });
