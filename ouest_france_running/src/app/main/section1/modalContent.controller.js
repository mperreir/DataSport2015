'use strict';

angular.module('hyblabApp')
  .controller('ModalInstanceCtrl', function($scope, $modalInstance) {

    $scope.ok = function() {
      $modalInstance.close();
    };


  });
