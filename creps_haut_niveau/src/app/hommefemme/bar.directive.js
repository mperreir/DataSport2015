(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsBar', [function(){
    return function(scope, element, attrs){
      var type = attrs.type || 'male';
      var value = attrs.value || 0;
      var max = attrs.max;
      var ratio = value / max * 100;

      element.addClass('bar');
      element.addClass('bar--' + type);

      scope.$on('slide:changed', function(){
        element.css('width', '0');
      });
      scope.$on('slide:gender', function(){
        element.css('width', ratio + '%');
      });
    }
  }]);
})();