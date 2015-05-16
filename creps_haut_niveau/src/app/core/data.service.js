(function(){
	'use strict';

	angular.module('hyblab.creps')
		.service('Data', ['$http', function($http){

			var service = this;

			service.getRegionInfo = function(){
				return $http.get('api/region')
				.then(function(response){
					service.region = response.data;
				});
			};

			service.getRepartition = function(){
				return $http.get('api/status')
				.then(function(response){
					service.repartition = response.data;
				});
			};

			service.getDepartementsInfo = function(){
				return $http.get('api/departements')
				.then(function(response){
					service.departements = response.data
				});
			};
		}]);
})();