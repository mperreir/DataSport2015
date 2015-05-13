(function(){
  'use strict';

  angular.module('hyblab.creps')
  .controller('LoadingCtrl', ['$q', '$state', 'Data', 'Credits', function($q, $state, Data, Credits){
    var allP = [];
    //allP.push(Data.getRegion());
    allP.push(Data.getRepartition());
    allP.push(Credits.get());

    $q.all(allP)
    .then(function(){
      $state.go('running');
    })
  }]);
})();