(function () {
  'use strict';

  angular.module('app', [
    /**
     * Bootstrap core modules
     */
    'app.core',
    'app.layout',

    /**
     * Custom modules
     */
    'app.tools',
    'app.pe-cs-calc',
    'app.vbac'

  ]);

})();