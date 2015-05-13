(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsBar', [function(){
    return function(scope, element, attrs){
      console.log('bar');
    }
  }]);
})();