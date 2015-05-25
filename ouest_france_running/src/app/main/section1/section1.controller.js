/**
 * Controlleur interne à la section 1
 *
 */
'use strict';
angular.module('hyblabApp')
  .controller('Section1Ctrl', function($scope, $http, $modal) {
    /*------------------------------------*\
         Formatage des données récupérées
    \*------------------------------------*/
    $scope.dataSlide1.distance = parseFloat($scope.dataSlide1.distance);
    $scope.dataSlide1.pourcentageHomme = $scope.dataSlide1.pourcentageHomme.toFixed(2);
    $scope.dataSlide1.pourcentageFemme = $scope.dataSlide1.pourcentageFemme.toFixed(2);
    /*------------------------------------*\
         Fonctions utilitaires
    \*------------------------------------*/
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
    /*------------------------------------*\
         Modal d'aide
    \*------------------------------------*/
    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'myModalContent.html', //situé -en dur- dans section1.html
        controller: 'ModalInstanceCtrl', // dans le fichier modalController
        size: 'lg',
        resolve: {}
      });
    };
    /*------------------------------------*\
         Visualisation 1 (carte)
    \*------------------------------------*/
    var villeLon;
    var villeLat;
    function getGeoData(cityName) {
        return $http.get('http://nominatim.openstreetmap.org/search/fr/' + cityName + '/1?format=json')
          .then(
            function(response) {
              villeLon = response.data[0].lon;
              villeLat = response.data[0].lat;
            },
            function(httpError) {
              // translate the error
              throw httpError.status + ' : ' + httpError.data;
            });
      }
      //on récupère les coordonées géographiques et on dessine la carte
    var geoData = getGeoData($scope.dataSlide1.nomVille)
      .then(function() {
        $('#map').vectorMap({
          map: 'fr_mill_en',
          series: {
            regions: [{
              values: $scope.dataSlide1.listeDepartement,
              scale: ['#1D1D1B', '#ffffff'],
              normalizeFunction: 'polynomial'
            }]
          },
          onRegionTipShow: function(e, el, code) {
            if ($scope.dataSlide1.listeDepartement[code]) {
              el.html(el.html() + ' - ' + $scope.dataSlide1.listeDepartement[code] + ' participants');
            } else {
              e.preventDefault();
            }
          },
          zoomButtons: false,
          backgroundColor: 'none',
          regionsSelectable: false,
          zoomOnScroll: false,
          regionStyle: {
            initial: {
              fill: '#1D1D1B'
            }
          },
          markers: [{
            latLng: [villeLat, villeLon], // Coordonées gps à récupérer
            name: $scope.dataSlide1.nomVille
          }],
          markerStyle: {
            initial: {
              fill: 'rgba(231,55,84,1)',
              stroke: 'none',
              'fill-opacity': 1,
              'stroke-width': 1,
              'stroke-opacity': 1,
              r: 6
            },
            hover: {
              stroke: 'rgba(231,55,84,1)',
              'stroke-width': 2,
              cursor: 'pointer'
            },
            selected: {},
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
      });
    /*---------------------------------------------------------*\
         Visualisation 2 (Pictos homme/femme se remplissant)
    \*---------------------------------------------------------*/
    $scope.heightHomme = 'height: ' + Math.round(186 * ($scope.dataSlide1.pourcentageHomme / 100)) + 'px;';
    $scope.heightFemme = 'height: ' + Math.round(190 * ($scope.dataSlide1.pourcentageFemme / 100)) + 'px;';
    /*----------------------------------------------------------------------*\
         Visualisation 3 (diagramme en barres, proportion H/F par catégorie)
    \*----------------------------------------------------------------------*/
    var dv3 = {
      data: {
        labels: ['Junior ', 'Espoir ', 'Sénior ', 'Vétéran 1 ', 'Vétéran 2 ', 'Vétéran 3 ', 'Vétéran 4 '],
        datasets: [{
          fillColor: 'rgba(29,29,27,1)',
          strokeColor: 'rgba(29,29,27,1)',
          pointColor: 'rgba(29,29,27,0.5)',
          pointstrokeColor: 'transparent',
          data: [$scope.dataSlide1.repartitionCatSexe.junior.homme,
            $scope.dataSlide1.repartitionCatSexe.espoir.homme,
            $scope.dataSlide1.repartitionCatSexe.senior.homme,
            $scope.dataSlide1.repartitionCatSexe.veteran1.homme,
            $scope.dataSlide1.repartitionCatSexe.veteran2.homme,
            $scope.dataSlide1.repartitionCatSexe.veteran3.homme,
            $scope.dataSlide1.repartitionCatSexe.veteran4.homme
          ],
          title: 'Hommes'
        }, {
          fillColor: 'rgba(231,55,84,1)',
          strokeColor: 'rgba(231,55,84,1)',
          pointColor: 'rgba(231,55,84,0.5)',
          pointstrokeColor: 'transparent',
          data: [$scope.dataSlide1.repartitionCatSexe.junior.femme,
            $scope.dataSlide1.repartitionCatSexe.espoir.femme,
            $scope.dataSlide1.repartitionCatSexe.senior.femme,
            $scope.dataSlide1.repartitionCatSexe.veteran1.femme,
            $scope.dataSlide1.repartitionCatSexe.veteran2.femme,
            $scope.dataSlide1.repartitionCatSexe.veteran3.femme,
            $scope.dataSlide1.repartitionCatSexe.veteran4.femme
          ],
          title: 'Femmes'
        }]
      },
      options: {
        animationStartWithDataset: 1,
        animationStartWithData: 1,
        animationLeftToRight: true,
        animationByDataset: true,
        animationSteps: 100,
        animationEasing: 'linear',
        canvasBorders: false,
        graphTitle: '',
        legend: false,
        datasetFill: false,
        scaleShowLabels: false,
        scaleShowLine: false,
        scaleLineColor: 'rgba(0,0,0,.0)',
        scaleLineWidth: 0,
        scaleOverlay: false,
        scaleFontFamily: 'sans-serif',
        scaleFontSize: 14,
        scaleFontStyle: 'normal',
        scaleFontColor: '#222',
        inGraphDataShow: false,
        annotateDisplay: true,
        annotateLabel: '<%=v3 + \' \' + (v1 == \'\' ? \'\' : v1) + (v1!=\'\' && v2 !=\'\' ? \' \' : \'\')+(v2 == \'\' ? \'\' : v2)+(v1!=\'\' || v2 !=\'\' ? \' \' : \'\')%>',
        scaleShowGridLines: false,
        rotateLabels: 'smart',
        dynamicDisplay: true

      }
    };
    var dv3Diagram = new Chart(document.getElementById('dv3').getContext('2d')).StackedBar(dv3.data, dv3.options);
    /*------------------------------------------------------------------------*\
         Visualisation 4 : Diag en barre horizontal (temps du premier/dernier)
    \*------------------------------------------------------------------------*/
    var dv4 = {
      data: {
        labels: [''],
        datasets: [{
          fillColor: 'rgba(29,29,27,0.5)',
          strokeColor: 'rgba(29,29,27,0.5)',
          pointColor: 'rgba(231,55,84,0.5)',
          pointstrokeColor: 'transparent',
          data: [$scope.dataSlide1.premier],
          title: 'Temps du premier coureur'
        }, {
          fillColor: 'rgba(29,29,27,1)',
          strokeColor: 'rgba(29,29,27,1)',
          pointColor: 'rgba(29,29,27,0.5)',
          pointstrokeColor: 'transparent',
          data: [$scope.dataSlide1.dernier],
          title: 'Temps du dernier coureur'
        }]
      },
      options: {
        scaleShowLabels: false,
        barShowStroke: false,
        animationStartWithDataset: 1,
        animationStartWithData: 1,
        animationSteps: 100,
        canvasBorders: false,
        graphTitle: '',
        legend: false,
        legendBorders: false,
        legendPosX: 3,
        legendPosY: 1,
        legendFontFamily: 'sans-serif',
        legendFontSize: 14,
        maxLegendCols: 1,
        legendFillColor: '#eee',
        inGraphDataShow: true,
        inGraphDataTmpl: '<%=v3.toHHMMSS() %>',
        inGraphDataFontFamily: 'sans-serif',
        inGraphDataFontSize: 14,
        inGraphDataFontColor: '#222',
        annotateDisplay: true,
        annotateLabel: '<%=(v1 == \'\' ? \'\' : v1) + (v1!=\'\' && v2 !=\'\' ? \' - \' : \'\') + \' : \' + v3.toHHMMSS() %>',
        scaleShowGridLines: false,
        scaleFontFamily: 'sans-serif',
        scaleFontSize: 18,
        scaleOverride: true,
        scaleSteps: 21,
        scaleStepWidth: $scope.dataSlide1.dernier / 20,
        scaleStartValue: 0,
        scaleFontColor: '#222',
        dynamicDisplay: true,
        responsive: true
      }
    };
    var dv4Diagram = new Chart(document.getElementById('dv4').getContext('2d')).HorizontalBar(dv4.data, dv4.options);
  });
