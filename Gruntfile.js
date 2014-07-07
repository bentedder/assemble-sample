/*global module:false*/
module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    wget: {
      rizzoVariables: {
        options: {
          baseUrl: "https://raw.githubusercontent.com/lonelyplanet/rizzo/master/app/assets/stylesheets/sass/variables"
        },
        src: [
          "/_typography.sass",
          "/_colour_palette.sass",
          "/_colour_theme.sass"
        ],
        dest: "src/sass/rizzo"
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: "dist",
          port: 9009
        }
      }
    },

    assemble: {
      options: {
        flatten: true
      },
      site: {
        files: { "dist/": [ "src/pages/*.hbs" ] },
        options: {
          layout: "src/layouts/default.hbs",
          data: "src/data/*.json",
          partials: "src/includes/*.hbs"
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: "expanded"
        },
        files: {
          "src/generated-css/main.css": "src/sass/app.sass"
        }
      }
    },

    cssmin: {
      combine: {
        options: {
          banner: "/* Minified CSS */"
        },
        files: {
          "dist/css/main.css": "src/generated-css/main.css"
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: [ "src/sass/**/*.sass" ],
        tasks: [ "clean:css","sass", "cssmin" ]
      },
      assemble: {
        files: [ "src/data/*", "src/includes/*", "src/layouts/*", "src/pages/*" ],
        tasks: [ "clean:files","assemble" ]
      },
      js: {
        files: [ "src/js/**/*.js", "Gruntfile.js" ],
        tasks: [ "clean:js", "jscs", "jshint", "browserify" ]
      }
    },

    browserify: {
      dist: {
        files: {
          "dist/js/app.js": "src/js/app.js"
        }
      }
    },

    jshint: {
      src: [ "Gruntfile.js", "src/js/**/*.js" ],
      options: {
        jshintrc: "./.jshintrc"
      }
    },

    jscs: {
      src: [ "Gruntfile.js", "src/js/**/*.js" ],
      options: {
        config: "./.jscs.json"
      }
    },

    clean: {
      js: "dist/js",
      css: "dist/css",
      files: "dist/*.html"
    }

  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks("assemble");
  grunt.loadNpmTasks("grunt-wget");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-jscs-checker");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // Default task.
  grunt.registerTask("default", [ "connect", "watch" ]);

};
