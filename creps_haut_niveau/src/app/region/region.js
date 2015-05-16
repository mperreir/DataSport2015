(function(){
  'use strict';

  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['$scope', 'Data',function($scope, Data){
  	var vm = this;
    vm.counthomme = 0;
    vm.countfemme = 0;
    vm.valuetotal = 0;

    vm.region = Data.region;
    console.log(vm.region);


    vm.hautNiveau = 0;
    vm.sportifsListes = 0;
    vm.espoirs = 0;
    vm.partenaires = 0;


    
    $scope.$on('slide:region',function(){
      $scope.$apply(function(){
        vm.counthomme = 63;
        vm.countfemme = 37;
        vm.valuetotal = 1026000;

        vm.hautNiveau = vm.region.hautNiveau.total;
        vm.sportifsListes = vm.region.total;
        vm.espoirs = vm.region.espoirs.total;
        vm.partenaires = vm.region.partenaires;

            
        vm.doughlabels = ["Moins de 18 ans en Espoir","Moins de 18 ans en Haut Niveau"];
        vm.doughdata = [vm.region.espoirs.underage,vm.region.hautNiveau.underage];
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
  .directive('crepsRegion',[function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/region/region.template.html',
      controller: 'RegionCtrl',
      controllerAs: 'region'
    };
  }]);
})();