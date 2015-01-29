/* global console, require */
'use strict';

var angular = require('angular');
var fs = require('fs');
var data = require('../data');

var avatar = require('../avatar.js');
var customFilter = require('../customFilter.js');

angular.module('Demo', [])

.controller('DemoController', function($scope, $http, counters) {
    $scope.data = data;

    $scope.$watch(function() {
        counters.apply++;
        console.log('counters:', counters);
    });

    $scope.get = function() {
        $http.get('http://updates.html5rocks.com').then(function() {
            console.log('response', arguments);
        });
    };

    $scope.clickme = function() {
        console.log('nothing!');
    };

})

.filter('customFilter', function() {
    var func = customFilter;
    func.$stateful = true;
    return func;
})

.value('counters', {
    apply: 0,
    filter: 0,
    func: 0
})

.filter('since', function(counters) {
    return function(value) {
        counters.filter++;
        var ddn = new Date(value);
        return (new Date()).getFullYear() - ddn.getFullYear();
    };
})

.filter('log', function() {
    function logFilter(msg) {
        console.log(msg);
        return 'log';
    }

    logFilter.$stateful = true;

    return logFilter;
})

.filter('avatar', function() {
    var func = avatar;
    func.$stateful = true;
    return func;
})

.directive('scopeIsolate', function() {
    return {
        restrict: 'E',
        scope: {},
        template: '<div>isolated model : {{\'scopeIsolate filter\'|log}} <input ng-model="isolateModel"/></div>',
        link: function(scope) {
            scope.$watch(function() {
                console.log('watch scope: {}');
            });
        }
    };
})

.directive('scopePrivate', function() {
    return {
        restrict: 'E',
        scope: false,
        template: '<div></div>',
        link: function(scope) {
            scope.$watch(function() {
                console.log('watch scope: false');
            });
        }
    };
})

.directive('scopeClone', function() {
    return {
        restrict: 'E',
        scope: true,
        template: '<div></div>',
        link: function(scope) {
            scope.$watch(function() {
                console.log('watch scope: true');
            });
        }
    };
})

.directive('tableExample', function(counters) {
    return {
        restrict: 'E',
        template: fs.readFileSync(__dirname + '/example.tpl.html').toString(),
        scope: {
            data:'='
        },
        controllerAs: 'Ctrl',
        controller: function($scope, $timeout) {

            this.formatFirst = function(value) {
                counters.func++;
                return value.toUpperCase();
            };
            this.clickRow = function(row) {
                row.checked = true;
            };
        }
    };
});

window.loadng = function() {
    angular.bootstrap(document.getElementById('ngdemo'), ['Demo']);
};
