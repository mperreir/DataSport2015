(function(){
  'use strict';

  angular.module('hyblab.creps')

  .controller('CreditsCtrl', ['Credits', function(Credits){
    var vm = this;

    Credits.get()
    .then(function(response){
      vm.people = response.data;
    });
  }])

  .directive('crepsCredits', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/credits/credits.template.html',
      controller: 'CreditsCtrl',
      controllerAs: 'credits'
    };
  }]);
})();