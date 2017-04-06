/**
 * Created by Kevin on 12/12/2016.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['$scope'];

  function AppCtrl($scope) {
    $scope.currentNavItem = 'pe-cs-calc';
  }

})();