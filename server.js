'use strict';

var express = require('express'),
    bodyParser = require('body-parser');

global.mongoose = require('mongoose');
global.app = express();

var init = require('./config/init')(),
    config = require('./config/config');

// enable cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// accept POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes
require('./config/routes');

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
