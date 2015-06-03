/*jslint node: true */

'use strict';

setTimeout(function () {
    for (var i = 0; i < 9999; i++) {
        console.log('I %d', i);
    }
}, 5000)