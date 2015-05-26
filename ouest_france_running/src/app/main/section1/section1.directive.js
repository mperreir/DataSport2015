/**
 * Déclaration de la directive "section 1"
 * Permettant d'utiliser la balise <section1> dans le main.html
 */
'use strict';
angular.module('hyblabApp')
  .directive('section1', function() {
    return {
      templateUrl: 'app/main/section1/section1.html',
      restrict: 'E',
      /*link: function (scope, element, attrs) {
      }*/
    };
  });
