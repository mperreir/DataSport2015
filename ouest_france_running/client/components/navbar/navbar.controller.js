'use strict';

angular.module('hyblabApp')
  .controller('NavbarCtrl', function($scope, $location, Data) {

    // Elements à gauche du menu
    $scope.menu = [{}];

    var course = {
      'plourhan25' : '../../assets/data/25km.csv',
      'plourhan45' : '../../assets/data/45km.csv'
    };


    $('.navbar-fixed-top').autoHidingNavbar();

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.changeCourse = function(nomCourse) {
      Data.switchData(course[nomCourse]);
    };


  });
