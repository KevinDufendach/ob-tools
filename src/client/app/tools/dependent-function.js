/**
 * Created by Kevin on 1/31/2017.
 */

(function () {
  angular
    .module('app.tools')
    .factory('dependentVariableNotifierService', dependentVariableNotifierService);

  /**
   * For an equation e.g. "a + b = c" will update
   * all dependent variables when a single variable
   * is updated and the service is notified of the change
   */
  function dependentVariableNotifierService() {
    var vm = this;
    var dependencies = {};

    var service = {
      add: add,
      notify: notify
    };

    return service;

    ///////////

    /**
     * Add a new dependency to the list
     *
     * newDependencies in the form of {key: function () { ... }).
     * Function is the function ot be executed when the service receives notification
     * that the variable was updated
     */
    function add(newDependencies) {
      // ToDo: Check to be sure dependency is an object with a string (identifier) and function
      angular.extend(dependencies, newDependencies);
    }

    function notify(id) {
      // Runs the function specified with the label "id"

      if (dependencies.hasOwnProperty(id) && typeof dependencies[id] === 'function') {
        dependencies[id]();
      }
    }
  }

})();
