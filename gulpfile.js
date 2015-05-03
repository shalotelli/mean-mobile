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

  appOutputFile: 'app.js',
  dependenciesOutputFile: 'dependencies.js',
  viewOutputFile: 'views.js',
  
  ignoreApp: '!./**/app{,/**}',
  ignoreDependencies: '!./**/dependencies{,/**}',
  ignoreViews: '!./**/views{,/**}',
  ignoreSass: '!./**/scss{,/**}',
  ignoreMarkdown: '!*.md',

  viewFiles: 'assets/views/**/*.html',
  appFiles: 'assets/app/**/*.js',
  sassFiles: 'assets/scss/**/*.scss'

};

gulp.task('clean', function (cb) {
  del([ watchFiles.devDir, watchFiles.buildDir ], cb);
});

gulp.task('bower-files', [ 'clean' ], function () {
  return gulp.src(mainBowerFiles())
    .pipe(concat(watchFiles.dependenciesOutputFile))
    .pipe(gulp.dest(watchFiles.jsDir));
});

gulp.task('templates', [ 'clean' ], function () {
  return gulp.src(watchFiles.viewFiles)
    .pipe(templateCache({ filename: watchFiles.viewOutputFile }))
    .pipe(gulp.dest(watchFiles.jsDir));
});

gulp.task('app', [ 'clean' ], function () {
  return gulp.src(watchFiles.appFiles)
    .pipe(jshint())
    .pipe(ngAnnotate())
    .pipe(concat(watchFiles.appOutputFile))
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
