'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'build/'
      }
    },

    usemin: {
      html: 'build/index.html'
    },

    copy: {
      build: {
        files: [{
          expand: true,
          dest: 'build',
          cwd: 'src',
          src: ['**/*.html', '!bower_components/**/*', 'assets/**/*']
        }]
      }
    },

    watch: {
      less: {
        files: 'src/**/*.less',
        tasks: ['lessAutoprefix']
      },
      js: {
        files: ['src/**/*.js', '!src/bower_components/**/*'],
        tasks: ['jshint']
      }
    },

    jshint: {
      options: {
        jshintrc: true
      }
    },

    less: {
      build: {
        files: {
          'src/main.css' : ['src/app/app.less']
        }
      }
    },

    autoprefixer: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
        build: {
          src: 'src/main.css',
          dest: 'src/main.css'
        },
      }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('lessAutoprefix', ['less', 'autoprefixer']);

  grunt.registerTask('build', [
    'lessAutoprefix',
    'copy:build', 
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin'
  ]);
  grunt.registerTask('default', 'watch');
};