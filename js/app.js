'use strict';

var React = require('react');

var data = require('./data.js');


var angulardemo = require('./angular/app.js');


var ExampleTable = React.createFactory(require('./react/ExampleTable.jsx'));


window.loadreact = function() {
    React.render(
        ExampleTable({
            data: data
        }),
        document.getElementById('reactdemo')
    );
}
