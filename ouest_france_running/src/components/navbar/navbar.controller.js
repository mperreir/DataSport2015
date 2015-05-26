'use strict';
angular.module('hyblabApp')
  .controller('NavbarCtrl', function($scope, $location, Data) {
    // Elements à gauche du menu
    $scope.menu = [{}];
    //Chemin des courses
    var course = {
      'plourhan25': '../../assets/data/25km.csv',
      'plourhan45': '../../assets/data/45km.csv'
    };
    $scope.isCollapsed = true;
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    /**
     * Appelle la fonction switchData du service Data
     * @param  {[string]} Nom de la course
     */
    $scope.changeCourse = function(nomCourse) {
      Data.switchData(course[nomCourse]);
    };
  });
