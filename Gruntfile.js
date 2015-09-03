module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
        browserify: {
          all: {
            options: {
              transform: [ "babelify" ]
            },
            src: ['app/index.js'],
            dest: 'app/built.js'
          }
        }
      });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask("default", ["browserify"]);
};
