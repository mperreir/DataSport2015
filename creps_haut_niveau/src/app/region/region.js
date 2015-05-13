(function(){
  'use strict';



  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['$q', 'Data',function($q, Data){
  	var vm = this;


  	Data.getAll()
  		.then(function(response){
  			vm.data = response.data;
  		});

  	var pFemale = Data.getFemales()
  		.then(function(response){
  			vm.femaleCount = response.data.length;
  		});

  	var pMale = Data.getMales()
  		.then(function(response){
  			vm.maleCount = response.data.length;
  		});

      $q.all([pFemale,pMale])
        .then(function(){
          var total = vm.maleCount + vm.femaleCount;
          var ratio = (vm.maleCount/total)*10;

          var ratioMale = Math.round(ratio);
          var ratioFemale = 10 - ratioMale;

          var rangeMale = [];
          for(var i=0;i<ratioMale;i++)
            {
              rangeMale.push(i);
            }

          var rangeFemale = [];
          for(var i=0;i<ratioFemale;i++)
            {
              rangeFemale.push(i);
            }

          vm.rangeMale = rangeMale;
          vm.rangeFemale = rangeFemale;

         //    vm.ratioFemale =  arrFemale;
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