'use strict';

var express = require('express');

global.mongoose = require('mongoose');
global.app = express();

var init = require('./config/init')(),
    config = require('./config/config');

require('./config/routes');

// enable cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// serve static files
app.use(express.static(__dirname + '/.tmp/public'));

// db connect
var db = mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, function(err) {
  if (err) {
    console.error('Could not connect to MongoDB!');
    console.log(err);
  }
});

// start server
var server = app.listen(process.env.port || config.server.port, function () {
  var host = server.address().address,
      port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
