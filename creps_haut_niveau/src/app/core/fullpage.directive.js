(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('fullpage', ['$rootScope', function($rootScope){
    return function(scope, element, attrs){
      var id = attrs.id;
      $('#' + id).fullpage({
        afterLoad: function(anchor, index){
          var eventName = '';
          switch(index){
            case 1: eventName = 'intro';
              break;
            case 2: eventName = 'description';
              break;
            case 3: eventName = 'region';
              break;
            case 4: eventName = 'departments';
              break;
            case 5: eventName = 'gender';
              break;
            case 6: eventName = 'credits';
              break;
          }
          $rootScope.$broadcast('slide:changed');
          $rootScope.$broadcast('slide:' + eventName);
        }
      });
    };
  }]);
})();