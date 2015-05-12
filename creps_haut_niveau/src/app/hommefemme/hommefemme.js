(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsHommefemme', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/hommefemme/hommefemme.template.html'
    };
  }]);
})();