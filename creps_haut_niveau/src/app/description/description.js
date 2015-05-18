(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * La directive en charge du rendu de la première section.
   *
   * @return {Directive}
   */
  .directive('crepsDescription', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/description/description.template.html'
    };
  }]);
})();