(function(){
  'use strict';

  angular.module('hyblab.creps')
  .directive('crepsDescription', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/description/description.template.html',
      link: function(scope, element, attrs){
        var $ps = element.find('p').hide();
        var $spans = element.find('span').hide();
        var $imgs = element.find('img').hide();

        scope.$on('slide:description', function(){
          $ps.show().addClass('animated').addClass('fadeIn');
          $imgs.show().addClass('animated').addClass('fadeIn');
          $spans.show().addClass('animated').addClass('fadeIn');
        });
      }
    };
  }]);
})();