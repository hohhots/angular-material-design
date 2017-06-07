'use strict';

(function($, angular) {
  // Define the `header` module
  angular.module('category', []);

  // Register `headerList` component, along with its associated controller and template
  angular
    .module('category')
    .component('appCategory', {
      templateUrl: template,
      controller: [
        '$scope',
        '$element',
        'Config',
        'Util',
        'Json',
        controller]
    });

  function template() {
    return 'scripts/category/category.template.html';
  }

  function controller($scope, $element, config, util, json) {
    var self = this,
        beginStickyElemId = "categoryBeginSticky",
        elem = $element.find("#" + beginStickyElemId),
        path = util.getUrlPath().substring(1),
        rootPath = config.json.rootPath;

    var windowScroll = function(e) {
      if($(window).scrollTop() > elem.offset().top){
        self.headerStickyHide = false;
      } else {
        self.headerStickyHide = true;
      }
    };

    var setSubjectsStyle = function() {
      $.each(self.subjects, function(i, val) {
          if(!self.subjectsStyle[val.id]){
            self.subjectsStyle[val.id] = {};
          }
          var url = rootPath + "/" + self.category.dirName + "/" + val.dirName + "/" + val.imageUrl
          self.subjectsStyle[val.id].backgroundImage = "url(" + url + ")";
        }
      )
    };

    $(window).scroll(function(e){
      $scope.$apply(function(){
        windowScroll(e);
      });
    });

    var init = function() {
      self.category = json.getCategory(path);

      self.subjects = self.jsons.subjects[self.category.id];

      setSubjectsStyle();

      self.classes = self.jsons.classes[self.category.id];
    };

    self.listMouseEnter = function(id) {
      if(!self.ListItemLinkStyle[id]){
        self.ListItemLinkStyle[id] = {};
      }
      self.ListItemLinkStyle[id].color = self.category.color;
    };

    self.listMouseLeave = function(id) {
      self.ListItemLinkStyle[id].color = "";
    };

    self.linkMouseEnter = function(event) {
      $(event.currentTarget).css({"text-decoration": "underline"});
    };

    self.linkMouseLeave = function(event) {
      $(event.currentTarget).css({"text-decoration": "none"});
    };

    self.subjectMouseEnter = function(id) {
      if(!self.subjectItemStyle[id]){
        self.subjectItemStyle[id] = {};
      }
      self.subjectItemStyle[id].textDecoration = "underline";
    };

    self.subjectMouseLeave = function(id) {
      self.subjectItemStyle[id].textDecoration = "none";
    };

    self.getUrl = function(url) {
      return util.convertUrl(self.category.dirName + "/" + url);
    };

    self.jsons = json;
    self.category = {};
    self.subjects = {};
    self.subjectsStyle = {};
    self.classes = {};
    self.classesStyle = {};
    self.ListItemLinkStyle = {};
    self.subjectItemStyle = {};
    self.headerStickyHide = true;

    $scope.$watch(function(){return self.jsons;}, init, true);
  }

})(jQuery, window.angular);
