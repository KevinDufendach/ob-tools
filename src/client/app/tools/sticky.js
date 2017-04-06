/**
 * Created by Kevin on 1/25/2017.
 */

(function () {
  angular
    .module('app.tools')
    .directive('stickyText', StickyDirective)
    .directive('stickySelect', StickySelectDirective);

  StickyDirective.$inject = ['$mdSticky'];

  function StickyDirective($mdSticky) {
    return {
      restrict: 'E',
      template: '<span>Sticky Text</span>',
      link: function (scope, element) {
        $mdSticky(scope, element);
      }
    };
  }

  StickySelectDirective.$inject = ['$mdSticky', '$compile'];

  function StickySelectDirective($mdSticky, $compile) {
    var SELECT_TEMPLATE =
      '<md-select ng-model="selected">' +
      '<md-option>Option 1</md-option>' +
      '</md-select>';

    return {
      restrict: 'E',
      replace: true,
      template: SELECT_TEMPLATE,
      link: function (scope, element) {
        $mdSticky(scope, element, $compile(SELECT_TEMPLATE)(scope));
      }
    };
  }

})();

