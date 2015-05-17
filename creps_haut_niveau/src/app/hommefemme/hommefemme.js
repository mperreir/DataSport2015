(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Le controller en charge du binding avec le template de comparaison H /F.
   * 
   * @return {Controller}
   */
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
    var maxSportEspoirs = 0;
    var maxSportHautNiveau = 0;
    sports.forEach(function(sport){
      if(sport.espoirs.males > maxSportEspoirs) maxSportEspoirs = sport.espoirs.males;
      if(sport.espoirs.females > maxSportEspoirs) maxSportEspoirs = sport.espoirs.females;

      if(sport.hautNiveau.males > maxSportHautNiveau) maxSportHautNiveau = sport.hautNiveau.males;
      if(sport.hautNiveau.females > maxSportHautNiveau) maxSportHautNiveau = sport.hautNiveau.females;
    });

    vm.maxCategory = (maxSportEspoirs > maxSportHautNiveau) ? maxSportEspoirs : maxSportHautNiveau;
  }])

  /**
   * La directive en charge du rendu de la section de comparaison de hommes 
   * et des femmes
   * 
   * @return {Directive}
   */
  .directive('crepsHommefemme', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/hommefemme/hommefemme.template.html',
      controller: 'HommefemmeCtrl',
      controllerAs: 'hommefemme'
    };
  }]);
})();