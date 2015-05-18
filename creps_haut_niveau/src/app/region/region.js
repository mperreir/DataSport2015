(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * La directive en charge du rendu de la section présentant les données
   * de la région.
   * 
   * @return {Directive}
   */
  .directive('crepsRegion',['$document', '$window', 'Data', function($document, $window, Data){
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'app/region/region.template.html',
      link: function(scope, element){
        var section = element.find('#region');
        var isRendered = false;
        var windowHeight = $window.innerHeight;
        var region = Data.region;
        console.log(region);

        scope.counthomme = 0;
        scope.countfemme = 0;
        scope.valuetotal = 0;
        scope.hautNiveau = 0;
        scope.sportifsListes = 0;
        scope.espoirs = 0;
        scope.partenaires = 0;
        scope.doughoptions = {
          scaleShowHorizontalLines: false,
          scaleShowVerticalLines: false,
          segmentStrokeColor : "rgba(255,255,255,0)",
          animateRotate : true,
          percentageInnerCutout: 75,
          responsive : true
        };
        
        scope.doughlabels = ["Moins de 18 ans en Espoir","Moins de 18 ans en Haut Niveau"];
        scope.doughcolours = ["#E85138","#f5907f"];

        $document.on('scroll', function(){
          if(!isRendered && $document.scrollTop() > section.offset().top - windowHeight/2){
            isRendered = true;
            scope.$apply(function(){
              console.log('uhergz');
              scope.counthomme = 63;
              scope.countfemme = 37;
              scope.valuetotal = 1026000;

              scope.hautNiveau = region.hautNiveau.total;
              scope.sportifsListes = region.total;
              scope.espoirs = region.espoirs.total;
              scope.partenaires = region.partenaires;
              scope.doughdata = [region.espoirs.underage,region.hautNiveau.underage];
            });
          }
        });
      }
    };
  }]);
})();