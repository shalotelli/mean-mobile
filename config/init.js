'use strict';

var glob = require('glob'),
    path = require('path');

module.exports = function () {
  // require models syncronously
  glob.sync('api/models/**/*.js').forEach(function (file) {
    globa[path.basename(file, '.js')] = require(path.resolve(file));
  });
};
