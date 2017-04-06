(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.vbac')
    .config(['$routeProvider', routeProvider]);

  /* @ngInject */
  function routeProvider($routeProvider) {
    $routeProvider.when('/vbac', getConfig());
  }

  function getConfig() {
    return {
      templateUrl: 'app/vbac/vbac.html',
      controller: 'vbacCalcCtrl',
      controllerAs: 'vm'
    };
  }
})
();