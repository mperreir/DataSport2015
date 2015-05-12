(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsCredits', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/credits/credits.template.html'
    };
  }]);
})();