(function(){
  'use strict';

  angular.module('hyblab.creps')
  .service('Credits', ['$http', function($http){
    var service = this;

    service.get = function(){
      return $http.get('api/credits');
    };
  }]);
})();