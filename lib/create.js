/*jslint node: true */

'use strict';

var fs = require('fs');
var path = require('path');
var scripted = require('../bin/scripted');

var _template = 'scripted-template.js'
var _pathTemplate = path.resolve(__dirname, '../config/' + _template);

var _writeFile = function (name) {
    var file = scripted.pathScripts + '/' + Date.now() + '-' + name + '.js';
    var path = fs.existsSync(_template) ? _template : _pathTemplate;
    fs.createReadStream(path).pipe(fs.createWriteStream(file));
    console.log(file + ' created');
};

var _createFolder = function () {
    if (!fs.existsSync(scripted.pathScripts))
        fs.mkdirSync(scripted.pathScripts);
};

exports.script = function () {
    var name = process.argv.slice(3).join('-').toLowerCase();

    if (!name)
        return console.log('Enter the file name. Ex.: scripted -c example');

    _createFolder();
    _writeFile(name);
};

exports.mongoose = function () {
    var mongooseFile = 'mongoose.json';
    var file = path.resolve(__dirname, '../config/' + mongooseFile);
    fs.createReadStream(file).pipe(fs.createWriteStream(mongooseFile));
    console.log('mongoose.json created');
}

exports.scripted = function () {
    fs.createReadStream(_pathTemplate).pipe(fs.createWriteStream(_template));
    console.log(_template + ' created');
}