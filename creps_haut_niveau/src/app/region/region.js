(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsRegion', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/region/region.template.html'
    };
  }]);
})();