(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * La directive en charge du rendu de bars horiztonales.
   * La directive attend :
   * - type (male / female), par defaut, male,
   * - value: la valeur de la bar, par défaut 0,
   * - max: la valeur maximum, pour calculer le ratio
   * - event: l'event sur lequel faire le rendu
   * 
   * @return {Directtive}
   */
  .directive('crepsBar', ['$document', '$window', function($document, $window){
    return function(scope, element, attrs){
      var type = attrs.type || 'male';
      var value = attrs.value || 0;
      var max = attrs.max;
      var ratio = value / max * 100;
      var isRendered = false;
      var windowHeight = $window.innerHeight;
      var offset = element.offset().top - windowHeight/1.2;

      element.addClass('bar');
      element.addClass('bar--' + type);

      $document.on('scroll', function(){
        if(!isRendered && $document.scrollTop() > offset){
          element.css('width', ratio + '%');
        }
      });
    }
  }]);
})();