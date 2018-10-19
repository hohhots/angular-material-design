'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('wordBegin', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      pagenum: '<',
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$element', '$interval', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $element, $interval, config, util, json) {
    var self = this;

    // variable for outside access 
    self.templateUrl = config.templateUrl.wordBegin;
    self.introduction = config.alphaLangs.introduction;
    self.translate = config.alphaLangs.translate;
    self.practice = config.alphaLangs.practice;
    self.hideMean = true;
    self.wordbeginView = {};
    self.wordbeginView.styles = {};
    self.wordbeginWordClass = '';

    self.translateClick = function () {
      self.hideMean = !self.hideMean;

      var st = self.wordbeginView.styles;
      var width = $(wordBeginViewClass).css('width');
      if (width == (viewWidth + widthUnit)) {
        //st.width = (viewWidth / 2 + widthUnit);
        $(wordBeginViewClass).animate({ "width": "-=" + viewWidth / 2}, 500);
        self.wordbeginWordClass = 'wordbegin-word';
      } else {
        //st.width = (viewWidth + widthUnit);
        $(wordBeginViewClass).animate({ "width": "+=" + viewWidth / 2}, 500);
        self.wordbeginWordClass = 'w3-col s6 m6 l6 wordbegin-word';
      }
      /*span.animate({ "opacity": "+=1" }, 2000, function () {
        animationDone = true;
        nextAnimation();
      });*/
    };

    self.wordClick = function (word) {
      $scope.$broadcast(config.events.playWordAnimation, word.word);
    };

    self.introductionClick = function () {
      var names = {};
      var url = config.mediaUrl.wordBegin;
      names.videos = {
        ogv: url + config.data.videos + '/word' + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/word' + config.dataTypes.videos[1]
      };
      names.name = self.jsonData[0].name;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.practiceClick = function () {
      util.changePath(config.pagesUrl.wordbeginPractice);
    };

    var viewWidth = 72;
    var widthUnit = 'px';
    var wordBeginViewClass = '.wordbegin-view';

    (function init() {
      self.wordbeginView.styles.width = (viewWidth / 2 + widthUnit);
      self.wordbeginWordClass = 'wordbegin-word';
    })();

  };
})();
