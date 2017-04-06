/**
 * Created by Kevin on 2/1/2017.
 */

(function () {
  'use strict';

  angular
    .module('app.tools')
    .directive('articleCitation', ArticleCitationDirective);

  function ArticleCitationDirective() {
    var directive = {
      scope: true,
      restrict: 'E',
      templateUrl: 'app/tools/article-citation.html',
      controller: controller,
      controllerAs: 'refCtrl'
    };

    return directive;

    function controller() {
      this.splitOnWhitespace = function (input) {
        return input.split(/[ ,]+/);
      };
    }
  }

})();