(function(){
	'use strict';

	angular.module('hyblab.creps')
		.service('Data', ['$http', function($http){

			var service = this;

			service.getAll = function(){
				return $http.get('api/all');
			};

			service.getFemales = function(){
				return $http.get('api/females');
			};

			service.getMales = function(){
				return $http.get('api/males');
			}
		}]);

})();