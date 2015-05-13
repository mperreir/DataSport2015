(function(){
  'use strict';

  angular.module('hyblab.creps')

  .controller('HommefemmeCtrl', ['Data', function(Data){
    var vm = this;
    
    var repartition = Data.repartition;
    var total = vm.total = repartition.total;
    vm.totalEspoirs = total.espoirs.males + total.espoirs.females;
    vm.totalHautNiveau = total.hautNiveau.males + total.hautNiveau.females;
    vm.maxEspoirs = (total.espoirs.males > total.espoirs.females) ? 
      total.espoirs.males : total.espoirs.females;
    vm.maxHautNiveau = (total.hautNiveau.males > total.hautNiveau.females) ? 
      total.hautNiveau.males : total.hautNiveau.females;
    
    var sports = vm.sports = repartition.sports;
    vm.maxSportEspoirs = 0;
    vm.maxSportHautNiveau = 0;
    sports.forEach(function(sport){
      if(sport.espoirs.males > vm.maxSportEspoirs) vm.maxSportEspoirs = sport.espoirs.males;
      if(sport.espoirs.females > vm.maxSportEspoirs) vm.maxSportEspoirs = sport.espoirs.females;

      if(sport.hautNiveau.males > vm.maxSportHautNiveau) vm.maxSportHautNiveau = sport.hautNiveau.males;
      if(sport.hautNiveau.females > vm.maxSportHautNiveau) vm.maxSportHautNiveau = sport.hautNiveau.females;
    });
  }])

  .directive('crepsHommefemme', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/hommefemme/hommefemme.template.html',
      controller: 'HommefemmeCtrl',
      controllerAs: 'hommefemme'
    };
  }]);
})();