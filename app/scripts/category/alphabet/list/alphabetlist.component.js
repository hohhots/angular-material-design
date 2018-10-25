'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('alphaList', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      pagenum: '<',
      subData: '<'
    },
    controller: ['$state', '$scope', '$element', '$http', 'Config', 'Util', 'Json', controller]
  });

  function controller($state, $scope, $element, $http, config, util, json) {
    var self = this;

    // variable for outside access 
    self.templateUrl = config.templateUrl.alphabetlist;
    self.introduction = config.alphaLangs.introduction;
    self.practice = config.alphaLangs.practice;
    self.lang = {
      back: config.alphaLangs.back
    };

    // alpha list data directory hash names array
    self.book = util.getBookPagesName(self.levelid);
    // classroom directory hash name
    self.bookJson = util.getBookJson(self.levelid, self.pagenum);

    self.$onInit = function () {
      util.setBook(self);
    };

    self.alphaClick = function (originName, originDirName, alphaId, alphaName) {
      var dirName = originDirName.substr(0, 1);
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      var gender = util.getRandomGender();
      names.name = originName + '第' + alphaId + '字母';
      names.audios = {
        mpeg: url + config.data.audios + '/' + dirName + '/' + alphaName + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + dirName + '/' + alphaName + gender + config.dataTypes.audios[0]
      };
      if ((originDirName == 'ga') && (alphaName == 'ge' || alphaName == 'gi' || alphaName == 'gu' || alphaName == 'gu2')) {
        originDirName = 'ha';
      }
      dirName = originDirName.substr(0, 1);
      names.videos = {
        webm: url + config.data.videos + '/' + dirName + '/' + util.convertAlphaName(alphaName) + config.dataTypes.videos[1],
        ogv: url + config.data.videos + '/' + dirName + '/' + util.convertAlphaName(alphaName) + config.dataTypes.videos[0]
      };
      $scope.$broadcast(config.events.playAlphaVideo, names);
    };

    self.introductionClick = function () {
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      names.videos = {
        ogv: url + config.data.videos + '/list' + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/list' + config.dataTypes.videos[1]
      };
      names.name = self.bookJson.videoTitle;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.practiceClick = function () {
      $state.go(config.uiState.listPractice.name, {levelid: self.levelid, pagenum: self.pagenum});
    };

    self.backClick = function () {
      $state.go(config.uiState.books.name, {levelid: self.levelid, pagenum: self.pagenum});
    };

    self.twoAlphasStyle = function () {
      if (self.alphabets[0].vowel.length === 2) {
        return 'alphalist-two';
      }
    };

    // 'vowelName' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaText = function (vowelName) {
      return util.convertOriginNameToCode(vowelName);
    };

    self.setModels = function (book, json) {
      self.book = book;
      self.bookJson = json;

      var order = self.bookJson.orderInList;
      self.alphabets = self.subData.slice(order - 1, order);
    };
  };

})();
