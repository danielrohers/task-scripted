/*jslint node: true*/

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Script = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Script', Script);