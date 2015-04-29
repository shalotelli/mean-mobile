'use strict';

var del = require('del'),
    gulp = require('gulp'),
    gulpBowerFiles = require('gulp-bower-files'),
    templateCache = require('gulp-angular-templatecache'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate');

var watchFiles = {
  devFolder: '.tmp/public/**',
  buildFolder: 'build/public/**',
  allFiles: '**/*',
  app: '!**/app/**',
  dependencies: '!**/dependencies/**',
  views: '!**/views/**',
  sass: '!**/scss/**',
  markdown: '!*.md'
};

gulp.task('clean', function (cb) {
  del([ watchFiles.devFolder, watchFiles.buildFolder ], cb);
});

gulp.task('bower-files', [ 'clean' ], function () {
  return gulpBowerFiles()
    .pipe(gulp.dest('assets/js/dependencies.js'));
});

gulp.task('templates', [ 'clear' ], function () {
  return gulp.src('assets/views/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('assets/js/views.js'));
});

gulp.task('scripts', [ 'clean' ], function () {
  
});

gulp.task('default', []);

gulp.task('serve', []);

gulp.task('build', []);
