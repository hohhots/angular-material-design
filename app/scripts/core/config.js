'use strict';

// Define the `core.config` module
angular.module('core.config', []);

angular.
  module('core.config').
  constant('Config',{
        app: {
          urlPrefix: "#!"
        },

        json: {
          rootPath: "data",
          tasksDir: "tasks",
          categories: "categories.json",
          footer: "footer.json",
          contact: "contact.json",
          about: "about.json",
        },

        home:{
          welcome: "学 - 优美蒙语<br>享 - 蒙古文化"
        },

        subject:{
          progress: "进度",
          targetProgress: "目标进度",
          practice: "练习",
          close: "关闭"
        },

        templateUrl: {
          header: 'scripts/header/header.template.html',
          home: 'scripts/home/home.template.html',
          category: 'scripts/category/category.template.html',
          subject: 'scripts/subject/subject.template.html',
          footer: 'scripts/footer/footer.template.html'
        }

      }
  );
