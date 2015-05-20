/**
 * Controlleur interne à la section 3
 *
 */


'use strict';

angular.module('hyblabApp')
  .controller('Section3Ctrl', function($scope) {

    console.log('Chargement du controlleur section3');

    console.log($scope.dataSlide3);

    var nbSections = $scope.dataSlide3.length;

    function getLabels() {
      var tmp = [];
      tmp.push('Premier arrivé');
      for (var i = 0; i < $scope.dataSlide3.length - 2; i++) {
        tmp.push('');
      }
      tmp.push('Dernier arrivé');
      return tmp;
    }


    var labels = getLabels();
    console.log(labels);


    var data = {
      labels: labels,
      datasets: [{
        fillColor: 'rgba(0,0,0,0.2)',
        strokeColor: 'rgba(80,80,80,1)',
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
      annotateDisplay: false,
      scaleShowGridLines: false,

      scaleFontFamily: 'sans-serif',
      scaleFontSize: 16,
      scaleFontColor: '#222',

      dynamicDisplay: true,
      responsive: true
    };


    var Line = new Chart(document.getElementById('dv6').getContext('2d')).Line(data,options);



  });
