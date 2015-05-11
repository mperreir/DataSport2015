/**
 * Déclaration de la directive "section 3"
 * Permettant d'utiliser la balise <section3> dans le main.html
 */

'use strict';

angular.module('hyblabApp')
  .directive('section3', function() {
    return {
      templateUrl: 'app/main/section3/section3.html',
      restrict: 'E',
      /*link: function (scope, element, attrs) {
      }*/
    };
  });
