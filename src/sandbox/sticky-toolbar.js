/**
 * Created by Kevin on 12/9/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.tools')
        .directive('stickyToolbar', StickyDirective);

    StickyDirective.$inject = ['$mdSticky', '$compile'];

    function StickyDirective($mdSticky, $compile) {
        return {
            restrict: 'E',
            template: '<md-toolbar>MyStickyToolbar</md-toolbar>',
            link: function(scope, element) {
                $mdSticky(scope, element);
            }
        };
    }
})();