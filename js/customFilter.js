'use strict';

module.exports = function(arr, query) {
    var regFilter = new RegExp(query, 'i');
    var rows = arr.filter(function(item) {
        return (regFilter.exec(item.first) || regFilter.exec(item.last) || regFilter.exec(item.email));
    });
    return rows;
}
