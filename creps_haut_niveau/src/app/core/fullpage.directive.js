(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Directive permettant l'intégration de fullpage dans AngularJS.
   * La directive lit l'ID de la balise et applique simplement .fullpage()
   *
   * La directive broadcast des évènements sur le $rootScope à chaque changement de slide.
   * 
   * @return {Directive}
   */
  .directive('fullpage', ['$rootScope', function($rootScope){
    return function(scope, element, attrs){
      var id = attrs.id;
      $('#' + id).fullpage({
        navigation: true,
        afterLoad: function(anchor, index){
          var eventName = '';
          switch(index){
            case 1: eventName = 'introduction';
              break;
            case 2: eventName = 'description';
              break;
            case 3: eventName = 'region';
              break;
            case 4: eventName = 'departements';
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