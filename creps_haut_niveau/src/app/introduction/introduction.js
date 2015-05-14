(function(){
  'use strict';

  angular.module('hyblab.creps')

  .directive('crepsIntroduction', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/introduction/introduction.template.html',
      link: function(scope, element, attrs){
        var $title1 = element.find('.title .title--text:first-child');
        var $title2 = element.find('.title .title--text:last-child');
        var $sep = element.find('.title--sep');

        $title1.addClass('animated').addClass('fadeInLeft');
        $sep.addClass('animated').addClass('fadeIn');
        $title2.addClass('animated').addClass('fadeInRight');
      }
    };
  }]);
})();