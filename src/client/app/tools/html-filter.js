// Ref: https://docs.angularjs.org/api/ng/service/$sce

(function () {
  'use strict';

  angular
    .module('app.tools')
    .filter('html', htmlFilter);

  htmlFilter.$inject = ['$sce'];

  function htmlFilter($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    };
  }

})();

