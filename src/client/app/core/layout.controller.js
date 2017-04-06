(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('layoutController', LayoutController);

  LayoutController.$inject = ['$mdMedia'];

  function LayoutController($mdMedia) {

    var vm = this;

    vm.$mdMedia = $mdMedia;
  }

})();