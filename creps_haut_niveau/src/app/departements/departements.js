(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Gère le databinding entre la vue et les données des départements.
   * Le controller réagit aux évènements emits par la directive jvectormap
   * pour récupérer le département courant.
   * 
   * @return {Controller}
   */
  .controller('DepartementsCtrl', ['$scope', 'Data', function($scope, Data){
    var vm = this;
    var departements = Data.departements;
    vm.doughcolours = ["#E85138","#f5907f"];
    vm.doughoptions = {
      scaleShowHorizontalLines: false,
      scaleShowVerticalLines: false,
      segmentStrokeColor : "rgba(255,255,255,0)",
      animateRotate : true,
      percentageInnerCutout: 75,
      responsive : true
    };
    
    setSelected('44');

    $scope.$on('departement:selected', function(e, data){
      $scope.$apply(function(){
        setSelected(data);
      });
    });

    function setSelected(dpt){
      vm.selected = departements[dpt];
      vm.doughLabel = ['Espoirs', 'Haut Niveau'];
      vm.doughData = [vm.selected.age.espoirs, vm.selected.age.hautNiveau];
    }
  }])

  /**
   * La directive en charge de la section affichant les informations sur les départements.
   * Le binding est laissé au controller, les manipulations de DOM à la fonction link.
   *  
   * @return {Directive}
   */
  .directive('crepsDepartements', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/departements/departements.template.html',
      controller: 'DepartementsCtrl',
      controllerAs: 'departements',
      link: function(scope, element, attrs){
        /*
        On gère les manipulations de DOM (animations) dans le link puisque c'est
        la fonction dans laquelle on est sur que le DOM est rendu.

        Lorsqu'un nouveau département est sélectionné, on ajoute la classe
        permettant de jouer l'animation.
        En fin d'animation on supprime la classe.
         */
        var $sports = element.find('.sports--container');
        var $listes = element.find('.listes');

        function onAnimationEnd($el){
          $el.removeClass('flipInX');
        }

        $sports.bind('animationend webkitAnimationEnd oAnimationEnd', onAnimationEnd.bind(this, $sports));
        $listes.bind('animationend webkitAnimationEnd oAnimationEnd', onAnimationEnd.bind(this, $listes));

        scope.$on('departement:selected', function(){
          $sports.addClass('flipInX');
          $listes.addClass('flipInX');
        });
      }
    }
  }]);
})();