(function(){
  'use strict';

  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['$q', 'Data',function($q, Data){
  	var vm = this;

    vm.region = Data.region;
    console.log(vm.region);


    vm.hautNiveau = vm.region.hautNiveau.total;
    vm.sportifsListes = vm.region.total;
    vm.espoirs = vm.region.espoirs.total;
    vm.partenaires = vm.region.partenaires;

    vm.moins18espoir = vm.region.espoirs.underage;
    vm.moins18hn = vm.region.hautNiveau.underage;

    vm.doughlabels = ["Mineurs de haut niveau","Majeurs de haut niveau"];
    vm.doughdata = [vm.moins18espoir,vm.moins18hn];
           
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