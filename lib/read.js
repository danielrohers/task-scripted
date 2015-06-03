/*jslint node: true */

'use strict';

var fs = require('fs');
var async = require('async');
var child_process = require('child_process');

var scripted = require('../bin/scripted');
var ScriptModel = require('../model/script');
var mongoose = require('../config/mongoose');

var _executeFile = function (name, cb) {
    var spawn = child_process.spawn('node', ['./' + scripted.pathScripts + '/' + name]);

    spawn.stdout.setEncoding('utf8');

    spawn.stdout.on('data', function(data) {
        console.log(data);
    });

    spawn.on('close', function (code) {
        new ScriptModel({ name: name }).save(function (err) {
            if (err)
                return cb(err);

            console.log('%s run script', name);
            return cb();
        })
    });

    spawn.on('error', function (error) {
        console.log('Error script: %s', name);
        return cb(error);
    });
};

module.exports = function () {
    fs.readdir(scripted.pathScripts, function (err, files) {
        if (err)
            return console.log('ERR: ', err);

        async.each(files, function (script, cb) {
            ScriptModel.findOne({ name: script }, function (err, migration) {
                if (err)
                    return cb(err);

                if (!!migration)
                    return cb();

                _executeFile(script, cb);
            });
        }, function (err) {
            if (err)
                return console.log('ERR: ', err);

            console.log('DONE');
            scripted.finished();
        });
    });
}