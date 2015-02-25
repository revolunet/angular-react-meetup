'use strict';

var wait = require('./wait');

module.exports = function(idx) {
    var sex = (idx%2)?'women':'men',
        num = idx % 100;
    //wait(1);
    return 'http://api.randomuser.me/portraits/' + sex + '/' + num + '.jpg';
};
