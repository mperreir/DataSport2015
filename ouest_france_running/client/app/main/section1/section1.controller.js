/**
 * Controlleur interne à la section 1
 *
 */

'use strict';

angular.module('hyblabApp')
  .controller('Section1Ctrl', function($scope) {

    console.log('Chargement du controlleur section1');

    $('#map').vectorMap({
      map: 'fr_mill_en',
      zoomButtons: false,
      backgroundColor: 'none',
      regionStyle: {
        initial: {
          fill: '#1D1D1B'
        }
      }
    });

    $scope.doughnut = {
      labels: ['Hommes', 'Femmes'],
      data: [30,70],
      colours: ['#1D1D1B', '#E73754'],
      options: {responsive: true}
    };

  });
