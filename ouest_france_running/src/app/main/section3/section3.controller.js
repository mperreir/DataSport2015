/**
 * Controlleur interne à la section 3
 *
 */
'use strict';
angular.module('hyblabApp')
  .controller('Section3Ctrl', function($scope) {
    /*-------------------------------------------------------*\
         Récupération, traitement et préparation des données
    \*-------------------------------------------------------*/
    /**
     * Formate un string permettant de faire un affichage propre des labels
     */
    function getLabels() {
      var tmp = [];
      tmp.push('Premier arrivé');
      for (var i = 0; i < $scope.dataSlide3.length - 2; i++) {
        tmp.push('');
      }
      tmp.push('Dernier arrivé');
      return tmp;
    }
    var nbSections = $scope.dataSlide3.length;
    var labels = getLabels();
    /*-------------------------------------------------------*\
         Création de la dataviz
    \*-------------------------------------------------------*/
    var data = {
      labels: labels,
      datasets: [{
        fillColor: 'rgba(90,90,90,0.1)',
        strokeColor: 'rgba(80,80,80,0.8)',
        pointColor: 'rgba(231,55,84,1)',
        pointStrokeColor: 'rgba(231,55,84,1)',
        data: $scope.dataSlide3,
        title: ''
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
      inGraphDataTmpl: '<%= v3 %>',
      inGraphDataFontFamily: 'sans-serif',
      inGraphDataFontSize: 14,
      inGraphDataFontColor: '#222',
      inGraphDataVAlign: 'left',
      inGraphDataAlign: 'center',
      inGraphDataPaddingY: 15,
      annotateDisplay: false,
      scaleShowGridLines: false,
      yAxisLabel: 'Nombre de coureurs dans cet intervalle de temps',
      xAxisLabel: 'Intervalle d\'arrivée, du premier au dernier',
      scaleFontFamily: 'sans-serif',
      scaleFontSize: 16,
      scaleFontColor: '#222',
      rotateLabels: 0,
      dynamicDisplay: true,
      responsive: true
    };
    var Line = new Chart(document.getElementById('dv6').getContext('2d')).Line(data, options);
  });
