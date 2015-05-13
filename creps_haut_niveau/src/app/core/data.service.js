(function(){
	'use strict';

	angular.module('hyblab.creps')
		.service('Data', ['$http', function($http){

			var service = this;

			service.getAll = function(){
				return $http.get('api/all');
			};

			service.getFemales = function(params){
				return $http({
					url: 'api/females',
					method: 'GET',
					params: params || {}
				});
			};

			service.getMales = function(params){
				return $http({
					url: 'api/males',
					method: 'GET',
					params: params || {}
				});
			};

			service.getRepartition = function(){
				return $http.get('api/status')
				.then(function(response){
					service.repartition = response.data;
				});
			}
		}]);

})();