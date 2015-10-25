'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ["build"]
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
          "img/**",
          "js/**",
          "index.html"
          ],
          dest: "build"
        }]
      }
    },
    sass: {
      style: {
        files: {
          'build/css/style.css': 'source/sass/style.scss'
        }
      }
    },
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },
    postcss: {
      options: {
        processors: [
        require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/style.css'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationlevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          "build/index.min.html": "build/index.html"
        }
      }
    },
    watch: {
      style: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    csscomb: {
      style: {
        expand: true,
        src: ["sass/**/*.scss"]
      }
    },
    uglify: {
      my_target: {
        files: {
          "build/js/script.min.js": ["source/js/*.js"]
        }
      }
    }

  };


  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "cmq",
    "postcss",
    "cssmin",
    "uglify",
    "imagemin",
    "htmlmin"
    ]);
};
