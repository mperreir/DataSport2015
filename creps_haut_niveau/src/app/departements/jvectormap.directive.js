(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Directive permettant d'intégrer jvectormap à AngularJS.
   * La directive initialise la hauteur de la balise à :
   * - 100% de la largeur de son conteneur
   * - 85% de la hauteur
   * 
   * La directive appelle ensuite .vectorMap sur l'élément. Lors du clic sur une région,
   * la directive enregistre l'évènement et le transmet sur le rootScope.
   * 
   * @return {Directive}
   */
  .directive('crepsJvectormap', ['$rootScope', '$window', function($rootScope, $window){
    return function(scope, element, attrs){
      element.css('height', '70%');
      element.css('width', '100%');
      
      $(element).vectorMap({
        map: 'fr_pays_loire',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        panOnDrag: false,
        zoomButtons: false,
        selectedRegions: '44',
        regionsSelectable: true,
        regionsSelectableOne: true,
        regionStyle: {
          initial: {
            fill: '#EFEFED',
            "fill-opacity": 1,
            stroke: '#232835',
            "stroke-width": 1,
            "stroke-opacity": 1
          },
          hover: {
            fill: '#232835',
            "fill-opacity": 0.4,
            cursor: 'pointer'
          },
          selected: {
            fill: '#232835',
          }
        },
        regionLabelStyle: {
          hover: {
            fill: '#EFEFED'
          },
          selected: {
            fill: '#EFEFED',
          }
        },
        labels: {
          regions: {
            render: function(code){
              if($window.innerWidth <= 768) return code;
              var name = '';

              switch(code){
                case '44': name = 'Loire-Atlantique';
                  break;
                case '49': name = 'Maine-et-Loire';
                  break;
                case '53': name = 'Mayenne';
                  break;
                case '72': name = 'Sarthe';
                  break;
                case '85': name = 'Vendée';
                  break;
              }
              return name;
            },
            offsets: function(code){
              return (code === '44') ? [0, -20] : [0, 0];
            }
          }
        },
        onRegionClick: function(e, code){
          $rootScope.$broadcast('departement:selected', code);
        }
      });
    };
  }]);
})();