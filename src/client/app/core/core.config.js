(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.otherwise({redirectTo: '/pe-cs-calc'});
    }]);
})();
