(function(){
  'use strict';

  angular.module('hyblab.creps')

  /**
   * Le controller de l'état de chargement de l'application.
   * Le controller lance le chargement des données:
   * - de la région
   * - des départements
   * - de la répartition H / F
   * - des crédits
   *
   * Puis lance l'état suivant, running
   * 
   * @return {Controller}
   */
  .controller('LoadingCtrl', ['$q', '$state', 'Data', function($q, $state, Data){
    var allP = [];
    allP.push(Data.getRegionInfo());
    allP.push(Data.getDepartementsInfo());
    allP.push(Data.getRepartition());
    allP.push(Data.getCredits());

    $q.all(allP)
    .then(function(){
      setTimeout(function(){
        $state.go('running');
      }, 500);
    })
  }]);
})();