(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsDescription', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/description/description.template.html',
      link: function(scope, element, attrs){

      }
    };
  }]);
})();