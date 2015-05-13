(function(){
  'use strict';

  angular.module('hyblab.creps')
  .controller('RegionCtrl', ['$q', 'Data',function($q, Data){
  	var vm = this;

    vm.region = Data.region;
    console.log(vm.region);

    var gender = vm.region.gender;
    vm.total = vm.region.total;
    var age = vm.region.age;

    var ratio = (gender.males/vm.total)*10;

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

          // à changer forcément
        $(document).ready(function() {
          setTimeout(function() {
        $('#circle').addClass('open');
        }, 500);

            vm.doughlabels = ["Mineurs de haut niveau","Majeurs de haut niveau"];
            vm.doughdata = [age.underage,age.adult];
           
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