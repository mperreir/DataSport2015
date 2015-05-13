(function(){
  'use strict';

  angular.module('hyblab.creps')

  .controller('HommefemmeCtrl', ['Data', function(Data){
    var vm = this;
    
    var repartition = Data.repartition;
    var total = vm.total = repartition.total;
    vm.maxEspoirs = (total.espoirs.males > total.espoirs.females) ? 
      total.espoirs.males : total.espoirs.females;
    vm.maxHautNiveau = (total.hautNiveau.males > total.hautNiveau.females) ? 
      total.hautNiveau.males : total.hautNiveau.females;
    
    vm.sports = repartition.sports;

    vm.getWidth = function(part, total){
      return { width : part / total * 100 };
    };
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