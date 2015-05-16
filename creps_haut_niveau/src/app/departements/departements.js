(function(){
  'use strict';

  angular.module('hyblab.creps')

  .controller('DepartementsCtrl', ['$scope', 'Data', function($scope, Data){
    var vm = this;
    console.log(Data.departements);
    var departements = Data.departements;
    vm.doughtColours = [{
      fillColor: 'rgba(47, 132, 71, 0.8)',
      strokeColor: 'rgba(47, 132, 71, 0.8)',
      highlightFill: 'rgba(47, 132, 71, 0.8)',
      highlightStroke: 'rgba(47, 132, 71, 0.8)'
    }];;
    
    setSelected('44');

    $scope.$on('departement:selected', function(e, data){
      $scope.$apply(function(){
        setSelected(data);
      });
    });

    function setSelected(dpt){
      vm.selected = departements[dpt];
      vm.doughtLabel = ['Moins de 18 ans en Espoirs', 'Moins de 18 ans en Haut Niveau'];
      vm.doughtData = [vm.selected.age.espoirs, vm.selected.age.hautNiveau];
    }
  }])

  .directive('crepsDepartements', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/departements/departements.template.html',
      controller: 'DepartementsCtrl',
      controllerAs: 'departements',
      link: function(scope, element, attrs){

      }
    }
  }]);
})();