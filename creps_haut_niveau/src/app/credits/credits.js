(function(){
  'use strict';

  angular.module('hyblab.creps')

  .controller('CreditsCtrl', ['Credits', function(Credits){
    var vm = this;

    vm.people = Credits.credits;
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