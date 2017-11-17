'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('monWord', {
    template: '<div ng-include="$ctrl.templateUrl" class="word-outerContainer"></div>',
    bindings: {
      orgintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.template;
    self.monText = '';
    self.containerStyle = {};

    self.$postLink = function () {

      var ow = 0;
      var oh = 0;

      var dim = $interval(function () {
        ow = parentElem[0].offsetWidth;
        oh = parentElem[0].offsetHeight;

        self.containerStyle.position = "absolute";
        self.containerStyle.width = oh + 'px';
        self.containerStyle.height = ow + 'px';

        $interval.cancel(dim);
      }, 20);



      console.log(parentElem);

      if (parentElem[0].offsetHeight) {
        oh = parentElem[0].offsetHeight;

      }

      self.monText = $sce.trustAsHtml(config.setMonWord(self.orgintext));
    };

    var parentElem = $element.parent();
  };
})();