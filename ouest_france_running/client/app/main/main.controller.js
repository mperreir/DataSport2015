/**
 * Conntrolleur de la route racine (/)
 * Nommé ici MainCtrl
 * (Ce n'est pas le controlleur principal, mais juste le controleur associé à la route /)
 */

'use strict';

angular.module('hyblabApp')
  .controller('MainCtrl', function($scope, Data) {
    var wow = new WOW().init();

    var promesseCreation = Data.create('../../assets/data/25km.csv');

    $scope.loaded = false;

    promesseCreation.then(function() {
      $scope.dataSlide1 = Data.getDataSlide1();
      $scope.dataSlide2 = Data.getDataSlide2();
      
      $scope.dataSlide3 = Data.getDataSlide3();
      $scope.loaded = true;
    });

    $scope.$on('Dataset switched', function() {
       $scope.loaded = false;
       Data.getPromise().then(function() {
         $scope.dataSlide1 = Data.getDataSlide1();         
         $scope.dataSlide2 = Data.getDataSlide2();
         
      $scope.dataSlide3 = Data.getDataSlide3();
         $scope.loaded = true;
       });
    });

  });
