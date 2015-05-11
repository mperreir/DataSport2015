/**
 * Déclaration de la directive "section 2"
 * Permettant d'utiliser la balise <section2> dans le main.html
 */

'use strict';

angular.module('hyblabApp')
  .directive('section2', function() {
    return {
      templateUrl: 'app/main/section2/section2.html',
      restrict: 'E',
      /*link: function (scope, element, attrs) {
      }*/
    };
  });
