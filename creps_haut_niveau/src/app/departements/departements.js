(function(){
  'use strict';

  angular.module('hyblab.creps')

  .controller('DepartementsCtrl', ['$scope', function($scope){
    var vm = this;

    $scope.$on('departement:selected', function(e, data){
      console.log(data);
    });
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