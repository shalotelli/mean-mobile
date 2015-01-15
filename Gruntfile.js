var config = require('./config/config');

module.exports = function (grunt) {
  var watchFiles = [ 
        '**/*', 
        '!**/app/**',
        '!**/dependencies/**',
        '!**/views/**',
        '!**/scss/**',
        '!*.md'
      ];

  grunt.initConfig({
    clean: {
      dev: [ '.tmp/public/**' ]
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: './assets',
          src: watchFiles,
          dest: '.tmp/public'
        }]
      }
    },

    sync: {
      dev: {
        files: [{
          cwd: './assets',
          src: watchFiles,
          dest: '.tmp/public'
        }]
      }
    },

    concat: {
      dev: {
        src: [ 'assets/app/config.js', 'assets/app/**/*' ],
        dest: 'assets/js/app.js'
      }
    },

    bower_concat: {
      dev: {
        dest: 'assets/js/dependencies.js'
      }
    },

    watch: {
      api: {
        files: [ 'api/**/*' ]
      },

      app: {
        files: 'assets/app/**/*',
        tasks: [ 'concat:dev', 'sync:dev' ]
      },

      dependencies: {
        files: [ 'assets/dependencies/**/*' ],
        tasks: [ 'bower_concat:dev', 'sync:dev' ]
      },

      sass: {
        files: [ 'assets/scss/**/*' ],
        tasks: [ 'compass:dev', 'sync:dev' ]
      },

      views: {
        files: [ 'assets/views/**/*' ],
        tasks: [ 'ngtemplates:dev', 'sync:dev' ]
      }
    },

    ngtemplates: {
      options: {
        module: 'ngtemplates.views'
      },

      dev: {
        cwd: 'assets/',
        src: 'views/**.html',
        dest: 'assets/js/views.js'
      }
    },

    compass: {
      options: {
        sassDir: 'assets/scss/',
        cssDir: 'assets/css/',
        imageDir: 'assets/img',
        outputStyle: 'compressed'
      },

      dev: {
        options: {
          debugInfo: false,
          outputStyle: 'expanded'
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'js,html',
          env: {
            PORT: config.server.port,
            callback: function (nodemon) {
              nodemon.on('log', function (event) {
                console.log(event.colour);
              });
            }
          }
        }
      }
    },

    concurrent: {
      dev: {
        tasks: [ 'nodemon', 'watch' ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'clean:dev',
    'bower_concat:dev',
    'ngtemplates:dev',
    'concat:dev',
    'compass:dev',
    'copy:dev'
  ]);

  grunt.registerTask('serve', [ 'default', 'concurrent:dev' ]);

  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
};
