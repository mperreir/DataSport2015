/**
 * Controlleur interne à la section 2
 *
 */

'use strict';


/*************************************************************************************************/
/****************Récupération, traitement et préparation des données******************************/
/*************************************************************************************************/


/**************************************************************************************************/
/**********************************Création de la dataviz******************************************/
/*************************************************************************************************/

angular.module('hyblabApp')
  .controller('Section2Ctrl', function($scope) {

    console.log('Chargement du controlleur section2');

    var data1 = {
      labels: ['Plus rapide  '],
      datasets: [{
        fillColor: '#6c6c65',
        strokeColor: '#6c6c65',
        data: [20]
      }]
    };
    var data2 = {
      labels: ['Moyenne     '],
      datasets: [{
        fillColor: '#86867e',
        strokeColor: '#86867e',
        data: [35]
      }]
    };
    var data3 = {
      labels: ['Plus lent      '],
      datasets: [{
        fillColor: '#9f9f98',
        strokeColor: '#9f9f98',
        data: [50]
      }]
    };

    var data4 = {
      labels: ['Votre temps'],
      datasets: [{
        fillColor: 'rgba(231,55,84,1)',
        strokeColor: 'rgba(231,55,84,1)',
        data: [31]
      }]
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
      inGraphDataTmpl: '<%=\' \' + v3 + \' min\'%>',
      inGraphDataFontFamily: 'sans-serif',
      inGraphDataFontSize: 14,
      inGraphDataFontColor: '#222',
      annotateDisplay: false,
      scaleShowGridLines: false,
      scaleOverride: true,
      scaleSteps: 6,
      scaleStepWidth: 10,
      scaleFontFamily: 'sans-serif',
      scaleFontSize: 16,
      scaleFontColor: '#222',
      scaleStartValue: 0
    };

    var Diagram1 = new Chart(document.getElementById('dv5-1').getContext('2d')).HorizontalBar(data1, options);
    var Diagram2 = new Chart(document.getElementById('dv5-2').getContext('2d')).HorizontalBar(data2, options);
    var Diagram3 = new Chart(document.getElementById('dv5-3').getContext('2d')).HorizontalBar(data3, options);
    var Diagram4 = new Chart(document.getElementById('dv5-4').getContext('2d')).HorizontalBar(data4, options);


    /**************************************************************************************************/
    /****************************************Manipulation**********************************************/
    /*************************************************************************************************/


    $scope.tabGenres = {
      'homme': 'section2-selector-active',
      'femme': 'section2-selector-active'
    };

    $scope.tabCat = {
      'es': 'section2-selector-active',
      'ju': 'section2-selector-active',
      'se': 'section2-selector-active',
      'v1': 'section2-selector-active',
      'v2': 'section2-selector-active',
      'v3': 'section2-selector-active',
      'v4': 'section2-selector-active'
    };

    /**
     * Gère le clic sur un genre
     * @param  {[string]} id
     */
     $scope.clicGenre = function(id) {
      if ($scope.tabGenres[id] === 'section2-selector-active') {
        $scope.tabGenres[id] = '';
      } else {
        $scope.tabGenres[id] = 'section2-selector-active';
      }
      console.log('Genre mofifié : ' + id +'. Valeur actuelle : ' + $scope.tabGenres[id]);
    };

    /**
     * Gère le clic sur une catégorie
     * @param  {[string]} id
     */
    $scope.clicCat = function(id) {
      if ($scope.tabCat[id] === 'section2-selector-active') {
        $scope.tabCat[id] = '';
      } else {
        $scope.tabCat[id] = 'section2-selector-active';
      }
      console.log('Catégorie modifiée : ' + id  +'. Valeur actuelle : ' + $scope.tabCat[id]);
    };

    /**
     * Get all connected users :
     * Push each user in a tuble and return it
     * @return a table of user objects
     */
    var getAll = function() {
    };





  });
