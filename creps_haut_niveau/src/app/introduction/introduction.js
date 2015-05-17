(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * La directive en charge du rendu de la page de titre.
   *
   * @return {Directive}
   */
  .directive('crepsIntroduction', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/introduction/introduction.template.html'
    };
  }]);
})();