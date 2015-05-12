(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('fullpage', [function(){
    return function(scope, element, attrs){
      var id = attrs.id;
      $('#' + id).fullpage();
    };
  }]);
})();