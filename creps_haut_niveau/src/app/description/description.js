(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * La directive en charge du rendu de la première section.
   *
   * @return {Directive}
   */
  .directive('crepsDescription', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/description/description.template.html',
      link: function(scope, element, attrs){
        /*
        Lors du rendu, on cache les éléments, auquels on appliquera
        un fadeIn lorsque l'on arrive sur la slide.
         */
        var $ps = element.find('p').hide();
        var $spans = element.find('span').hide();
        var $imgs = element.find('img').hide();
        var isRendered = false;

        scope.$on('slide:description', function(){
          if(isRendered) return;

          $ps.fadeIn();
          $imgs.fadeIn();
          $spans.fadeIn();
          isRendered = true;
        });
      }
    };
  }]);
})();