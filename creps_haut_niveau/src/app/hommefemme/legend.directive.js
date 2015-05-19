(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * La directive permettant d'ajouter la légend à des bars horizontales.
   * La directive attend :
   * - un maximum
   * - un nombre de segments
   * - l'orientation, par defaut 'left'
   * 
   * @return {Directive}
   */
  .directive('crepsBarlegend', [function(){
    return function(scope, element, attrs){
      var max = attrs.max;
      var nbSegments = attrs.segments;
      var orientation = attrs.orientation || 'left';

      element.css('width', '100%');

      var interval = max / nbSegments;
      var width = interval * (100 / max);
      for(var i = 0 ; i<= max ; i+=interval){
        var div = $('<div><span class="legend--circle">.</span><span>' + i + '</span></div>')
          .css('float', orientation)
          .addClass('circle--before');

        if(i === 0){
          if(orientation === 'left'){
            div.css('width', width / 2 + '%')
              .css('text-align', 'left');
          }
          else {
            div.css('width', width / 2 + '%')
              .css('text-align', 'right');
          }
        }
        else if(i == max){
          if(orientation === 'left'){
            div.css('width', width / 2 + '%')
              .css('text-align', 'right');
          }
          else {
            div.css('width', width / 2 + '%')
              .css('text-align', 'left');
          }
        }
        else {
          div.css('width', width + '%')
            .css('text-align', 'center');
        }

        element.append(div);
      }
    };
  }]);
})();