
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

    factory('DataSource', ['$http', '$rootScope', 'API_URI', R24.DataSourceProvider]).

    controller('HomeController', ['$scope', '$rootScope', 'DataSource', R24.HomeController]);