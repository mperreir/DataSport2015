'use strict';

angular.module('hyblabApp')
  .controller('NavbarCtrl', function($scope, $location) {

    // Elements à gauche du menu
    $scope.menu = [{}];

    $('.navbar-fixed-top').autoHidingNavbar();

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };


  });
