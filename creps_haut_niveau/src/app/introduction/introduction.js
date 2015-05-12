(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsIntroduction', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/introduction/introduction.template.html'
    };
  }]);
})();