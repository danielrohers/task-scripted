/*jslint node: true */

'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var scripted = require('../bin/scripted');

var _mongoosePath = __dirname + '/mongoose.json';

var uri = process.env.MONGO_SCRIPTED;

if (!uri && !fs.existsSync(_mongoosePath)) {
  console.log('Create mongoose.json or environment variable MONGO_SCRIPTED');
  scripted.finished();
}

uri = uri || require(_mongoosePath).url;

mongoose.connect(uri);

var db = mongoose.connection;

db.once('open', function callback() {
  console.log('Connected to mongodb: ', uri);
});

db.on('error', function (err) {
  console.log('Connection error: ', err.message);
  scripted.finished();
});

module.exports = mongoose;
