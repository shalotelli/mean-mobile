'use strict';

var config = require('./config/config');

var del = require('del'),
    gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    templateCache = require('gulp-angular-templatecache'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon');

var watchFiles = {
  allFiles: './**/*',

  devDir: '.tmp/public/',
  buildDir: 'build/public/',
  assetsDir: './assets/',
  jsDir: 'assets/js/',
  sassDir: 'assets/scss/',
  cssDir: 'assets/css/',
  imageDir: 'assets/img/',

  dependenciesOutputFile: 'assets/js/dependencies.js',
  ignoreDependencies: '!./**/dependencies{,/**}',

  viewFiles: 'assets/views/**/*.html',
  viewOutputFile: 'assets/js/views.js',
  ignoreViews: '!./**/views{,/**}',
  
  appFiles: 'assets/app/**/*.js',
  appOutputFile: 'assets/js/app.js',
  ignoreApp: '!./**/app{,/**}',

  sassFiles: 'assets/scss/**/*.scss',
  ignoreSass: '!./**/scss{,/**}',

  ignoreMarkdown: '!*.md'
};

gulp.task('clean', function (cb) {
  del([ watchFiles.devDir, watchFiles.buildDir ], cb);
});

gulp.task('bower-files', [ 'clean' ], function () {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest(watchFiles.dependenciesOutputFile));
});

gulp.task('templates', [ 'clean' ], function () {
  return gulp.src(watchFiles.viewFiles)
    .pipe(templateCache())
    .pipe(gulp.dest(watchFiles.viewOutputFile));
});

gulp.task('app', [ 'clean' ], function () {
  return gulp.src(watchFiles.appFiles)
    .pipe(jshint())
    .pipe(ngAnnotate())
    .pipe(concat(watchFiles.appOutputFile.split('/').pop()))
    .pipe(gulp.dest(watchFiles.jsDir));
});

gulp.task('styles', [ 'clean' ], function () {
  return gulp.src(watchFiles.sassFiles)
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(sourcemap.write())
    .pipe(gulp.dest(watchFiles.cssDir));
});

gulp.task('dev', [ 'templates', 'bower-files', 'app', 'styles' ], function () {
  return gulp.src([
    watchFiles.allFiles,
    watchFiles.ignoreApp,
    watchFiles.ignoreSass,
    watchFiles.ignoreMarkdown,
    watchFiles.ignoreViews,
    watchFiles.ignoreDependencies
  ], {
    cwd: watchFiles.assetsDir
  })
  .pipe(gulp.dest(watchFiles.devDir));
});

gulp.task('build', []);

gulp.task('serve', [ 'dev' ], function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {
      port: config.server.port,
      callback: function (nodemon) {
        nodemon.on('log', function (event) {
          console.log(event.colour);
        });
      }
    }
  });
});
