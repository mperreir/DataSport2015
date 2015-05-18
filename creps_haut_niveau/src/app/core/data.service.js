(function(){
	'use strict';

	angular.module('hyblab.creps')

	/**
	 * Le service permettant de charger toutes les données depuis le serveur.
	 * Il permet de charger :
	 * - les infos de la région
	 * - les infos des départements de la région
	 * - les répartitions homme / femme
	 * - les crédits
	 */
	.service('Data', ['$http', function($http){
		var service = this;

		/**
		 * Charge les informations de la région :
		 * - le nombre de sportifs listés
		 * - le nombre de partenaires
		 * - les statistiques Espoir (total + nb mineurs)
		 * - les statistiques Haut Niveau (total + nb mineurs)
		 * 
		 * @return {Promise}
		 */
		service.getRegionInfo = function(){
			return $http.get('api/region')
			.then(function(response){
				service.region = response.data;
			});
		};

		/**
		 * Charge la répartition homme femme par catégorie (espoirs + HN) :
		 * - le tableau des 10 sports les plus pratiqués avec pour chaque sport:
		 * 		- le nom
		 * 		- l'icone
		 * 		- les stats espoirs (h / f)
		 * 		- les stats HN (h / f)
		 * - les stats générales :
		 * 		- les stats espoirs (h / f)
		 * 		- les stats HN (h / f)
		 * 		
		 * @return {Promise}
		 */
		service.getRepartition = function(){
			return $http.get('api/status/?count=10')
			.then(function(response){
				service.repartition = response.data;
			});
		};

		/**
		 * Charge pour chaque département :
		 * - le nombre de sportifs listés
		 * - le tableau des 3 sports les plus pratiqués
		 * - la répartition des espoirs / HN mineurs
		 * 
		 * @return {Promise}
		 */
		service.getDepartementsInfo = function(){
			return $http.get('api/departements')
			.then(function(response){
				service.departements = response.data
			});
		};

		/**
		 * Charge les crédits, un tableau avec pour chaque personne :
		 * - son img
		 * - son nom
		 * - son école
		 * @return {Promise}
		 */
		service.getCredits = function(){
			return $http.get('api/credits')
			.then(function(response){
				service.credits = response.data;
			});
		};
	}]);
})();