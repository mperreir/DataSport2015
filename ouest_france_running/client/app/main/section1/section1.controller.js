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
      regionsSelectable: false,
      regionStyle: {
        initial: {
          fill: '#1D1D1B'
        }
      },
      markers: [{
        latLng: [47.2172500, -1.5533600],
        name: 'Nantes'
      }, {
        latLng: [48.1119800, -1.6742900],
        name: 'Rennes'
      }],
      markerStyle: {
        initial: {
          fill: '#fff',
          stroke: 'none',
          'fill-opacity': 1,
          'stroke-width': 1,
          'stroke-opacity': 1,
          r: 5
        },
        hover: {
          stroke: '#eee',
          'stroke-width': 2,
          cursor: 'pointer'
        },
        selected: {
          fill: 'blue'
        },
        selectedHover: {}
      },
      markerLabelStyle: {
        initial: {
          'font-family': 'Lato',
          'font-size': '16',
          'font-weight': '400',
          cursor: 'default',
          fill: 'black'
        },
        hover: {
          cursor: 'pointer'
        }
      }
    });

    var dv2 = {
      data : [
      	{
      		value : 300,
      		color: 'rgba(231,55,84,1)',
          title : 'Femmes'
      	},
      	{
      		value : 700,
      		color: 'rgba(29,29,27,1)',
          title : 'Hommes'
      	}
      ],
      options: {
        animateRotate : true,
        animateScale : true,
        animationByData : false,
        animationSteps : 50,
        animationEasing: 'linear',
        canvasBorders : false,
        graphTitle : '',
        legend : false,
        inGraphDataShow : false,
        annotateDisplay : true,
        spaceBetweenBar : 0,
        graphTitleFontSize: 18
      }
    };

    var dv2Diagram = new Chart(document.getElementById('dv2').getContext('2d')).Doughnut(dv2.data,dv2.options);

    var dv3 = {
      data: {
        labels: ['Espoir ', 'Junior ', 'Sénior ', 'Vétéran 1 ', 'Vétéran 2 ', 'Vétéran 3 ', 'Vétéran 4 ', 'Vétéran 5 '],
        datasets: [{
          fillColor: 'rgba(231,55,84,0.5)',
          strokeColor: 'rgba(231,55,84,1)',
          pointColor: 'rgba(231,55,84,0.5)',
          pointstrokeColor: 'transparent',
          data: [35, 43, 59, 25, 31, 50, 66, 3],
          title: 'Femmes'
        }, {
          fillColor: 'rgba(29,29,27,0.5)',
          strokeColor: 'rgba(29,29,27,1)',
          pointColor: 'rgba(29,29,27,0.5)',
          pointstrokeColor: 'transparent',
          data: [95, 53, 99, 10, 73, 27, 82, 80],
          title: 'Hommes'
        }]
      },
      options: {
        animationLeftToRight: true,
        animationByDataset: true,
        animationSteps: 100,
        animationEasing: 'linear',
        canvasBorders: false,
        canvasBordersWidth: 3,
        canvasBordersColor: 'transparent',
        graphTitle: '',
        legend: false,
        inGraphDataShow: false,
        annotateDisplay: true,
        graphTitleFontSize: 18
      }
    };

    var dv3Diagram = new Chart(document.getElementById('dv3').getContext('2d')).Radar(dv3.data,dv3.options);

    $scope.dv4 = {
      data: {
        labels: ['Plus rapide', 'Moyenne', 'Plus lent'],
        series: [
          [20.15, 28.40, 39.6]
        ]
      },
      options: {
        axisX: {
          // On the x-axis start means top and end means bottom
          position: 'start'
        },
        axisY: {
          // On the y-axis start means left and end means right
          position: 'start'
        },
        reverseData: true,
        horizontalBars: true
      }
    };




  });
