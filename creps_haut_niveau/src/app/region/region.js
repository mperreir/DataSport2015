(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Le controller de la section présentant les données générales
   * de la Region.
   * 
   * @return {Controller}
   */
  .controller('RegionCtrl', ['$scope', 'Data',function($scope, Data){
  	var vm = this;
    var region = Data.region;

    vm.counthomme = 0;
    vm.countfemme = 0;
    vm.valuetotal = 0;
    vm.hautNiveau = 0;
    vm.sportifsListes = 0;
    vm.espoirs = 0;
    vm.partenaires = 0;
    
    $scope.$on('slide:region',function(){
      $scope.$apply(function(){
        vm.counthomme = 63;
        vm.countfemme = 37;
        vm.valuetotal = 1026000;

        vm.hautNiveau = region.hautNiveau.total;
        vm.sportifsListes = region.total;
        vm.espoirs = region.espoirs.total;
        vm.partenaires = region.partenaires;

            
        vm.doughlabels = ["Moins de 18 ans en Espoir","Moins de 18 ans en Haut Niveau"];
        vm.doughdata = [region.espoirs.underage,region.hautNiveau.underage];
        vm.doughcolours = ["#E85138","#f5907f"];

        vm.doughoptions = {
          scaleShowHorizontalLines: false,
          scaleShowVerticalLines: false,
          segmentStrokeColor : "rgba(255,255,255,0)",
          animateRotate : true,
          percentageInnerCutout: 75,
          responsive : true
        };
      });
    });
           
  }])

  /**
   * La directive en charge du rendu de la section présentant les données
   * de la région.
   * 
   * @return {Directive}
   */
  .directive('crepsRegion',[function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/region/region.template.html',
      controller: 'RegionCtrl',
      controllerAs: 'region'
    };
  }]);
})();