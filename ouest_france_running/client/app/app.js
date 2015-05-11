/*------------------------------------*\
    FICHIER APP.JS
\*------------------------------------*/
/**
 * Il est le coeur de l'application. C'est ici qu'on ajoute les modules angular à utiliser globalement
 * On retrouve aussi la configuration globale
 */
'use strict';

angular.module('hyblabApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'angular-parallax',
    'duScroll'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
