/**
 * Configuration de la route racine (/)
 * Nommée ici main
 */
'use strict';
angular.module('hyblabApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
