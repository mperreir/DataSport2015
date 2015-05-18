(function(){
  'use strict';

  /**
   * Point d'entrée de l'application. Nous utilisons Angular pour plusieurs raison :
   * - utilisation de templates pour chacune des sections (répartition du travail dans le binome)
   * - avoir une application structurée
   * - faciliter le chargement des données
   * - ... Angular c'est super pratique
   *
   * ------
   * FONCTIONNEMENT GENERAL DE L'APP
   * Nous utilisons fullpage pour créer une section par page. Chaque section correspond à
   * une directive Angular.
   *
   * L'appli est découpée en deux états (ui.router) :
   * - loading -> charge l'ensemble des données puis passe à l'état suivant
   * - running -> affiche les sections de fullpage
   *
   * -----
   * ARCHITECTURE
   * - app.js                   -> création du module
   * - app.less                 -> feuille de style (less, à compiler avec Grunt)
   * |-- core/                  -> contient les fonctionnalités partagées par les sections (chargement,...)
   * |-- credits/               -> la section des remerciements
   * |-- departements/          -> la section avec les départements
   * |-- description/           -> la section de description du projet
   * |-- hommefemme/            -> la section comparant les espoirs / HN hommes et femmes.
   * |-- introduction/          -> la section avec le titre
   * |-- loading/               -> l'écran de chargement
   * |-- region/                -> la section affichant les données générales de la région
   *
   * Chaque dossier comporte au minimum les fichiers suivants :
   * - <section>.js             -> la déclaration de la directive, le controlleur
   * - <section>.template.html  -> le template de la section
   * - <section>.less           -> la feuille de style de la section
   */
  angular.module('hyblab.creps', ['ui.router', 'ngFitText', 'angular-chartist', 'countTo', 'chart.js'])

  /**
   * Configuration générale de l'application.
   * On y définit les états (loading + running). Pour chaque état, on spécifie :
   * - son template
   * - son controller (optionnel)
   */
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('loading', {
      url: '', //état par défaut
      templateUrl: 'app/loading/loading.template.html',
      controller: 'LoadingCtrl'
    });

    $stateProvider.state('running', {
      template: 
        '<div creps-introduction id="introduction"></div>'
        + '<div creps-description id="description"></div>'
        + '<div creps-region id="region"></div>'
        + '<div creps-departements id="departements"></div>'
        + '<div creps-hommefemme id="hommefemme"></div>'
        + '<div creps-credits id="credits"></div>'
    })
  }]);
})();