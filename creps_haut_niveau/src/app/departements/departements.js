(function(){
  'use strict';

  angular.module('hyblab.creps')

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
      vm.doughLabel = ['Moins de 18 ans en Espoir', 'Moins de 18 ans en Haut Niveau'];
      vm.doughData = [vm.selected.age.espoirs, vm.selected.age.hautNiveau];
    }
  }])

  .directive('crepsDepartements', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/departements/departements.template.html',
      controller: 'DepartementsCtrl',
      controllerAs: 'departements',
      link: function(scope, element, attrs){
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