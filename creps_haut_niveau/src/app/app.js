(function(){
  'use strict';

  angular.module('hyblab.creps', ['ui.router', '720kb.tooltips', 'angular-chartist','countTo','chart.js'])

  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('loading', {
      url: '',
      templateUrl: 'app/loading/loading.template.html',
      controller: 'LoadingCtrl'
    });

    $stateProvider.state('running', {
      template: '<div id="fullpage" fullpage>' +
        '<div class="section" creps-introduction id="introduction"></div>' +
        '<div class="section" creps-region id="region"></div>' +
        '<div class="section" creps-hommefemme id="hommefemme"></div>' +
        '<div class="section" creps-credits id="credits"></div>' +
      '</div>'
    })
  }])

  .run(function(){
    console.log('Angular app running');
  });
})();