'use strict';

(function($, angular) {
  // Define the `core.json` module
  angular.module('core.json', [
    'ngResource',
    'core.config',
    'core.util'
  ]);

  angular.
    module('core.json').
    factory('Json', ['$resource', 'Config', 'Util', json]);

  function json($resource, config, util) {
    var url = config.data.data;
    var resources = {};
    var resource;
    var postFix = util.upperFirstLetter(config.data.tasks) + ".json";

    var setResource = function(turl){
      turl = turl?(url + "/" + turl):url;

      if(resources[turl]) {
        resource = resources[turl];
      } else {
        resource = resources[turl] = $resource(turl + '/:path/:fileName', {}, {
          query: {
            method: 'GET',
            params: {
              path: '.',
              fileName: 'categories.json'
            },
            isArray: true,
            cache: true
          }
        });
      }
    }

    var getJsonData = function() {
      setResource();

      resource.query({}, function(data) {
          $.each(data, function(i, val) {
            jsons.categories[val.id] = val;

            resource.query({path: val.dirName, fileName: val.dirName + ".json"}, function(data1) {
              $.each(data1, function(j, val1) {
                if(!jsons.subjects[val.id]){
                  jsons.subjects[val.id] = {};
                }
                jsons.subjects[val.id][val1.id] = val1;

                if(!jsons.classes[val.id]){
                  jsons.classes[val.id] = {};
                }
                if(!jsons.classes[val.id][val1.id]){
                  jsons.classes[val.id][val1.id] = {};
                }

                if(val.id == 1){ //Just for data alphabet, MUST REMOVE AFTER DATA COMPLETE.
                  setResource(val.dirName);
                  resource.query({path: val1.dirName, fileName: val1.dirName + ".json"}, function(data2) {
                  $.each(data2, function(k, val2) {
                      jsons.classes[val.id][val1.id][val2.id] = val2;
                    })
                  });
                }  //Just for data alphabet
              })
            });
          });
        }
      );

      resource.query({fileName: config.json.footer}, function(data) {
          $.each(data, function(i, val) {
            jsons.footer[val.id] = val;
          });
        }
      );

      resource.query({fileName: config.json.contact}, function(data) {
          $.each(data, function(i, val) {
            jsons.contacts[val.id] = val;
          });
        }
      );

      resource.query({fileName: config.json.about}, function(data) {
          $.each(data, function(i, val) {
            jsons.about[val.id] = val;
          });
        }
      );

    };

    //Use this get category data according to access url
    //www.xxxx.com/#!/dirname
    var getCategoryJson = function(dirname) {
      var ob = {};

      $.each(jsons.categories, function(i, val) {
        if(val.dirName == dirname) {
          ob = val;
        }
      })

      return ob;
    };

    var getSubjectJson = function(catId, dirname) {
      if(!jsons.categories[catId]){
        return {};
      }

      var ob = {};

      $.each(jsons.subjects[catId], function(i, val) {
        if(val.dirName == dirname) {
          ob = val;
        }
      })

      return ob;
    };

    var getResourcesConfigJson = function(category, subject) {
      if(category.dirName && subject.dirName) {
        var path = category.dirName + "/" + subject.dirName + "/";
        setImagesConfig(path + config.data.images, subject.dirName, category.id, subject.id);
        setAudiosConfig(path + config.data.audios, subject.dirName, category.id, subject.id);
        setVideosConfig(path + config.data.videos, subject.dirName, category.id, subject.id2);
      }
    };

    var setImagesConfig = function(path, filePrefix, catid, subid) {
      if(!jsons.images[catid]){
        jsons.images[catid] = {};
      }

      if(!jsons.images[catid][subid]){
        setResource(path);

        var file = filePrefix + util.upperFirstLetter(config.data.images) + ".json";
        resource.query({fileName: file}, function(data) {
            jsons.images[catid][subid] = data[0];
          });
      }

    };

    var setAudiosConfig = function(path, filePrefix, catid, subid) {
      if(!jsons.audios[catid]){
        jsons.audios[catid] = {};
      }

      if(!jsons.audios[catid][subid]){
        setResource(path);

        var file = filePrefix + util.upperFirstLetter(config.data.audios) + ".json";
        resource.query({fileName: file}, function(data) {
            jsons.audios[catid][subid] = data[0];
          });
      }

    };

    var setVideosConfig = function(path, filePrefix, catid, subid) {
      if(!jsons.videos[catid]){
        jsons.videos[catid] = {};
      }

      if(!jsons.videos[catid][subid]){
        setResource(path);

        var file = filePrefix + util.upperFirstLetter(config.data.videos) + ".json";
        resource.query({fileName: file}, function(data) {
            jsons.videos[catid][subid] = data[0];
          });
      }

    };

    var getSubjectTasksJson = function(cat, sub) {
      if(!cat.dirName || !sub.dirName) {
        return;
      }

      if(!jsons.tasks[cat.id]){
        jsons.subjectTasks[cat.id] = {};
        jsons.tasks[cat.id] = {};
      }

      if(!jsons.tasks[cat.id][sub.id]){
        jsons.subjectTasks[cat.id][sub.id] = {};
        jsons.tasks[cat.id][sub.id] = {};
      }

      //if(jsons.tasks[cat.id][sub.id] != {}){
      //  return jsons.tasks[cat.id][sub.id];
      //}

      var catPath = cat.dirName;
      var subPath = sub.dirName;
      var path = catPath + "/" + subPath + "/" + config.data.tasks;

      setResource(path);
      resource.query({fileName: subPath + postFix}, function(data) {
          $.each(data, function(i, val) {
              jsons.subjectTasks[cat.id][sub.id][val.id] = val;

              setResource(path + "/" + val.dirName);
              resource.query({fileName: val.dirName + postFix}, function(data2) {
                  $.each(data2, function(j, val1) {
                      if(!jsons.tasks[cat.id][sub.id][val.id]){
                        jsons.tasks[cat.id][sub.id][val.id] = {};
                      }
                      jsons.tasks[cat.id][sub.id][val.id][val1.id] = val1;
                    }
                  )
                }
              );

            }
          )
        }
      );

      return jsons.subjectTasks[cat.id][sub.id];
    }

    var getTasksJson = function(catid, subid) {
      if(!catid || !subid) {
        return;
      }
      return jsons.tasks[catid][subid];
    };

    var setExcerciseConfigJson = function(path, file) {
      setResource(path);

      resource.query({fileName: file}, function(data) {
        jsons.excerciseConfig = data[0];
      });
    };

    var setExercisesJson = function(path, prefix) {
      setResource(path);

      resource.query({fileName: prefix + postFix}, function(data) {
        $.each(data, function(i, val) {
            jsons.excercises[val.id] = val;
          });
      });
    }

    var jsons = {
      categories: {},
      subjects: {},
      classes: {},
      subjectTasks: {},
      tasks: {},
      excercises: {},

      excerciseConfig: {},
      // images,audios,videos for excercise material
      images: {},
      audios: {},
      videos: {},

      footer: {},
      contacts: {},
      about: {},

      getCategory: getCategoryJson,
      getSubject: getSubjectJson,
      getSubjectTasks: getSubjectTasksJson,
      getResourcesConfig: getResourcesConfigJson,
      getTasks: getTasksJson,
      setExcerciseConfig: setExcerciseConfigJson,
      setExercises: setExercisesJson
    };

    getJsonData();

    return jsons;
  };
})(jQuery, window.angular);
