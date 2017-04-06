/**
 * Created by Kevin on 3/20/2017.
 */

(function () {
  angular
    .module('app.calc-core')
    .directive('calculatorDisplay', CalculatorDisplay);

  CalculatorDisplay.$inject = ['$mdSticky', '$compile', '$mdTheming', '$mdUtil', '$mdAria'];

  // based on https://github.com/angular/material/blob/master/src/components/subheader/subheader.js
  function CalculatorDisplay($mdSticky, $compile, $mdTheming, $mdUtil, $mdAria) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: (
        '<div class="calculator-display _krd">' +
        '  <div class="calculator-display-inner">' +
        '    <div class="calculator-display-content"></div>' +
        '  </div>' +
        '</div>'
      ),
      link: function postLink(scope, element, attr, controllers, transclude) {
        $mdTheming(element);
        element.addClass('_krd');

        // Remove the ngRepeat attribute from the root element, because we don't want to compile
        // the ngRepeat for the sticky clone again.
        $mdUtil.prefixer().removeAttribute(element, 'ng-repeat');

        var outerHTML = element[0].outerHTML;

        function getContent(el) {
          return angular.element(el[0].querySelector('.calculator-display-content'));
        }

        // Set the ARIA attributes on the original element since it keeps it's original place in
        // the DOM, whereas the clones are in reverse order. Should be done after the outerHTML,
        // in order to avoid having multiple element be marked as headers.
        attr.$set('role', 'heading');
        $mdAria.expect(element, 'aria-level', '2');

        // Transclude the user-given contents of the subheader
        // the conventional way.
        transclude(scope, function (clone) {
          getContent(element).append(clone);
        });

        // Create another clone, that uses the outer and inner contents
        // of the element, that will be 'stickied' as the user scrolls.
        if (!element.hasClass('md-no-sticky')) {
          transclude(scope, function (clone) {
            // If the user adds an ng-if or ng-repeat directly to the md-subheader element, the
            // compiled clone below will only be a comment tag (since they replace their elements with
            // a comment) which cannot be properly passed to the $mdSticky; so we wrap it in our own
            // DIV to ensure we have something $mdSticky can use
            var wrapper = $compile('<div class="calculator-display-wrapper" aria-hidden="true">' + outerHTML + '</div>')(scope);

            // Delay initialization until after any `ng-if`/`ng-repeat`/etc has finished before
            // attempting to create the clone
            $mdUtil.nextTick(function () {
              // Append our transcluded clone into the wrapper.
              // We don't have to recompile the element again, because the clone is already
              // compiled in it's transclusion scope. If we recompile the outerHTML of the new clone, we would lose
              // our ngIf's and other previous registered bindings / properties.
              getContent(wrapper).append(clone);
            });

            // Make the element sticky and provide the stickyClone our self, to avoid recompilation of the subheader
            // element.
            $mdSticky(scope, element, wrapper);
          });
        }
      }
    };
  }

})();
