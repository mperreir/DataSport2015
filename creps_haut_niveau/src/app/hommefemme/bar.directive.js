(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsBar', [function(){
    return function(scope, element, attrs){
      var type = attrs.type || 'male';
      var value = attrs.value || 0;
      var max = attrs.max;
      var ratio = value / max * 100;

      element.css('width', ratio + '%');
      element.addClass('bar');
      element.addClass('bar--' + type);
    }
  }]);
})();