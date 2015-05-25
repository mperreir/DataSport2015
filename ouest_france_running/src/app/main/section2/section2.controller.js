/**
 * Controlleur interne à la section 2
 *
 */
'use strict';
angular.module('hyblabApp')
  .controller('Section2Ctrl', function($scope) {
    /*-------------------------------------------------------*\
         Récupération, traitement et préparation des données
    \*-------------------------------------------------------*/
    // Tableau des temps initial et tableau actuel filtré par les sélecteurs
    var tableauEntier = _.sortBy($scope.dataSlide2, 'temps');
    var tableauActuel = tableauEntier;
    // Tableaux de stockage de l'état des sélecteurs genre et catégorie
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
      if ($scope.tabGenres.M === '' && $scope.tabGenres.F === '') {
        viderCoureurs();
      } else {
        updateTab();
      }
    };
    /**
     * Filtre : n'est pas du genre passé en paramètre
     * @param  {[string]} genre
     */
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
      if ($scope.tabCat.ES === '' && $scope.tabCat.JU === '' && $scope.tabCat.SE === '' && $scope.tabCat.V1 === '' && $scope.tabCat.V2 === '' && $scope.tabCat.V3 === '' && $scope.tabCat.V4 === '') {
        viderCoureurs();
      } else {
        updateTab();
      }
    };
    /**
     * Filtre : n'est pas de la catégorie passée en paramètre
     * @param  {[string]} catégorie
     */
    function isNotCat(cat) {
        return function(Object) {
          return Object.cat !== cat;
        };
      }
      /**
       * Met a jour les tableaux contenant les valeurs des temps des coureurs,
       * ainsi que les variables de scope indiquant les temps du podium et les temps importants
       */
    var updateTab = function() {
      // On réinitialise le tableau
      var tableauTemp = tableauEntier;
      // On le filtre avec les sélecteurs définis
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
      // On met à jour les variables d'affichage
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
      // Et on redessine les graphes (cette librairie n'a pas encore de fonction d'update)
      Diagram1 = new Chart(document.getElementById('dv5-1').getContext('2d')).HorizontalBar(getData1(), options);
      Diagram2 = new Chart(document.getElementById('dv5-2').getContext('2d')).HorizontalBar(getData2(), options);
      Diagram3 = new Chart(document.getElementById('dv5-3').getContext('2d')).HorizontalBar(getData3(), options);
    };
    /*******************************************************************/
    /*********Getters permettant d'avoir les temps importants**********/
    /*****************************************************************/
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
    // initialisation des  variables de scope définissant les temps notables
    $scope.first = getFirst(tableauActuel);
    $scope.second = getSecond(tableauActuel);
    $scope.third = getThird(tableauActuel);
    $scope.tempsFirst = $scope.first.temps.toHHMMSS();
    $scope.tempsSecond = $scope.second.temps.toHHMMSS();
    $scope.tempsThird = $scope.third.temps.toHHMMSS();
    $scope.last = plusLent(tableauActuel);
    $scope.mean = tempsMoyen(tableauActuel);
    $scope.nbCoureursSlide2 = tableauActuel.length;
    function viderCoureurs() {
        //On met à jour les valeurs
        $scope.first = '';
        $scope.first.temps = 0;
        $scope.second = '';
        $scope.third = '';
        $scope.tempsFirst = 0;
        $scope.tempsSecond = 0;
        $scope.tempsThird = 0;
        $scope.last = 0;
        $scope.mean = 0;
        $scope.nbCoureursSlide2 = 0;
        // Et on redessine les graphes (cette librairie n'a pas encore de fonction d'update)
        Diagram1 = new Chart(document.getElementById('dv5-1').getContext('2d')).HorizontalBar(getData1(), options);
        Diagram2 = new Chart(document.getElementById('dv5-2').getContext('2d')).HorizontalBar(getData2(), options);
        Diagram3 = new Chart(document.getElementById('dv5-3').getContext('2d')).HorizontalBar(getData3(), options);
      }
      /*-------------------------------------------------------*\
           Création de la dataviz
      \*-------------------------------------------------------*/
      /*************************************************************/
      /*********Getters permettant de charger les dataviz**********/
      /***********************************************************/
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
    //Options communes des visualisations
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
    // Génération des dataviz
    var Diagram1 = new Chart(document.getElementById('dv5-1').getContext('2d')).HorizontalBar(getData1(), options);
    var Diagram2 = new Chart(document.getElementById('dv5-2').getContext('2d')).HorizontalBar(getData2(), options);
    var Diagram3 = new Chart(document.getElementById('dv5-3').getContext('2d')).HorizontalBar(getData3(), options);
    /*-------------------------------------------------------*\
         Fonctions utilitaires
    \*-------------------------------------------------------*/
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
    /**
     * Recherche un utilisateur en fonction de son dossard
     * @param  {[int]} dossard de l'utilisateur entré dans le formulaire
     */
    $scope.search = function(dossard) {
      $scope.erreurRecherche = false;
      var result = _.find($scope.dataSlide2, {
        'dossard': dossard
      });
      if (result) {
        //On affiche le graphe et on dessine la visualisation du temps de l'utilisateur
        $scope.connected = true;
        var Diagram4 = new Chart(document.getElementById('dv5-4').getContext('2d')).HorizontalBar(getData4(result.temps), options);
      } else {
        // on renvoie une erreur
        $scope.erreurRecherche = true;
      }
    };
  });
