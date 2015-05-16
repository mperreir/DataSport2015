(function(){
  'use strict';

  angular.module('hyblab.creps')

  .directive('crepsJvectormap', ['$rootScope', '$window', function($rootScope, $window){
    return function(scope, element, attrs){
      var elClass = attrs.class;

      element.css('height', '80%');
      element.css('width', '100%');
      
      setTimeout(function(){
        $('.' + elClass).vectorMap({
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
      }, 0)
    };
  }]);
})();