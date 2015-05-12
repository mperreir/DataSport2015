(function(){
  'use strict';



  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['Data',function(Data){
  	var vm = this;

  	Data.getAll()
  		.then(function(response){
  			vm.data = response.data;
  			console.log(response);
  		});

  	Data.getFemales()
  		.then(function(response){
  			vm.femaleCount = response.data.length;
  			console.log(vm.femaleCount);
  		});

  	Data.getMales()
  		.then(function(response){
  			vm.maleCount = response.data.length;
  			console.log(response);
  		});

  }])
  .directive('crepsRegion', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/region/region.template.html',
      controller: 'RegionCtrl',
      controllerAs: 'region'
    };
  }]);
})();