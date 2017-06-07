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
          categories: "categories.json",
          footer: "footer.json",
          contact: "contact.json",
          about: "about.json",
        },

        home:{
          welcome: "学 - 优美蒙语<br>享 - 蒙古文化"
        },

      }
  );
