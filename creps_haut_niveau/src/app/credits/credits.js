(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Création de la directive affichant la section Crédits.
   * 
   * @return {Directive}
   */
  .directive('crepsCredits', ['Data', function(Data){
    return {
      restrict: 'EA',
      scope: {}, // scope isolé
      templateUrl: 'app/credits/credits.template.html',
      link: function(scope){
        scope.people = Data.credits;

        scope.people.forEach(function(person){
          person.delay = Math.random() + 's';
        });
      }
    }
  }]);
})();