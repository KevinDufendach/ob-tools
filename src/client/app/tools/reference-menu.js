/**
 * Created by Kevin on 2/1/2017.
 */

(function () {
  'use strict';

  angular
    .module('app.tools')
    .directive('referenceMenu', ReferenceMenuDirective);

  function ReferenceMenuDirective() {
    var directive = {
      scope: {
        'references': '@'
      }, // todo haven't checked to be sure this is correct way to scope references
      restrict: 'E',
      templateUrl: 'app/tools/reference-menu.html',
      controller: controller,
      controllerAs: 'menuCtrl'
    };

    return directive;

    function controller() {
      var vm = this;

      var originatorEv;

      vm.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };
    }
  }
})();