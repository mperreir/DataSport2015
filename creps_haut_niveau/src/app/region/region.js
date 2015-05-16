(function(){
  'use strict';

  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['$scope', 'Data',function($scope, Data){
  	var vm = this;
    vm.region = Data.region;

    vm.counthomme = 0;
    vm.countfemme = 0;
    vm.valuetotal = 0;
    vm.hautNiveau = 0;
    vm.sportifsListes = 0;
    vm.espoirs = 0;
    vm.partenaires = 0;

    vm.moins18espoir = vm.region.espoirs.underage;
    vm.moins18hn = vm.region.hautNiveau.underage;

    vm.doughlabels = ["Mineurs de haut niveau","Majeurs de haut niveau"];
    vm.doughdata = [vm.moins18espoir,vm.moins18hn];

    $scope.$on('slide:region',function(){
      $scope.$apply(function(){
        vm.counthomme = 63;
        vm.countfemme = 37;
        vm.valuetotal = 1026000;

        vm.hautNiveau = vm.region.hautNiveau.total;
        vm.sportifsListes = vm.region.total;
        vm.espoirs = vm.region.espoirs.total;
        vm.partenaires = vm.region.partenaires;
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