(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.pe-cs-calc')
    .config(['$routeProvider', routeProvider]);

  /* @ngInject */
  function routeProvider($routeProvider) {
    $routeProvider.when('/pe-cs-calc', getConfig());
  }

  function getConfig() {
    return {
      templateUrl: 'app/pe-cs-calc/pe-cs-calc.html',
      controller: 'peCalcCtrl',
      controllerAs: 'vm'
    };
  }
})
();