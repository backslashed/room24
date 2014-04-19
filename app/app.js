
'use strict';

var app = angular.module('Room24', [
   'ngAnimate',
   'ngRoute',
   'ngSanitize',
   'ngTouch'
]);

app.
    constant('API_URI', 'static/content.json').

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/home/template.html',
                controller: 'HomeController'
            }).
            otherwise('/');
    }]).

    factory('DataSource', R24.DataSourceProvider).

    controller('HomeController', R24.HomeController);