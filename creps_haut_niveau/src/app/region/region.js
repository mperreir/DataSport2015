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
        var offset = scope.offset = section.offset().top - windowHeight/1.2;

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
        
        scope.doughlabels = ["- de 18 ans en Espoir ", '+ de 18 ans en Espoir ',"- de 18 ans en Haut Niveau ", '+ de 18 ans en Haut Niveau '];
        scope.doughcolours = ["#f5907f","#E85138", '#A1D5EA', '#2F81D3'];

        $document.on('scroll', function(){
          if(!isRendered && $document.scrollTop() > offset){
            isRendered = true;
            scope.$apply(function(){
              console.log('uhergz');
              scope.counthomme = 63;
              scope.countfemme = 37;
              scope.valuetotal = 1026000;

              var majeursEspoirs = region.espoirs.total - region.espoirs.underage;
              var majeursHN = region.hautNiveau.total - region.hautNiveau.underage;

              scope.hautNiveau = region.hautNiveau.total;
              scope.sportifsListes = region.total;
              scope.espoirs = region.espoirs.total;
              scope.partenaires = region.partenaires;
              scope.doughdata = [region.espoirs.underage, majeursEspoirs, region.hautNiveau.underage, majeursHN];

              
            });
          }
        });
      }
    };
  }]);
})();