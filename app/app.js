
var app = angular.module('Room24', [
   'ngAnimate',
   'ngRoute',
   'ngSanitize',
   'ngTouch']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'app/home/template.html',
            controller: 'HomeController'
        }).
        otherwise('/');

}]);

app.controller('HomeController', ['$scope', R24.HomeController]);