'use strict';

var React = require('react');

var data = require('./data.js');


var angulardemo = require('./angular/app.js');


var ExampleTable = React.createFactory(require('./react/ExampleTable.jsx'));



window.startAnim = function() {

    function startJs() {
        /* requestAnimationFrame based animation */
        var tgts = document.querySelectorAll('.squarejs');
        var start = (new Date()).getTime();

        var degByms = 360/1000;

        var rotation = 0;
        function rotate() {
          for (var i=0; i<tgts.length; i++) {
            tgts[i].style.transform = 'rotateZ(' + rotation + 'deg)';
          }

          rotation = ((new Date()).getTime()- start) * degByms;
          rotation %= 360;
          window.requestAnimationFrame(rotate);
        }

        window.requestAnimationFrame(rotate);
    }

    function startCss() {
        /* pure css animation */
        var tgts = document.querySelectorAll('.squarecss');
        document.querySelector('.squarecss');
        for (var i=0; i<tgts.length; i++) {
            tgts[i].classList.add('rotate');
        }
    }

    startJs();
    startCss();
}

window.loadreact = function() {
    React.render(
        ExampleTable({
            data: data
        }),
        document.getElementById('reactdemo')
    );
}
