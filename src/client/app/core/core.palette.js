(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app')
    .config(['$mdThemingProvider', function ($mdThemingProvider) {

      $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('grey');

      $mdThemingProvider.theme('footer')
        .primaryPalette('grey')
        .accentPalette('red')
        .dark();
    }]);

})();