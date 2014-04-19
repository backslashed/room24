
'use strict';

var app = angular.module('Room24', [
   'ngAnimate',
   'ngRoute',
   'ngSanitize',
   'ngTouch',
   'ui.router'
]);


/*
 * /
 * /category/:category_id
 * /category/:category_id/:item_id
 *
 * /about
 *
 */


app.
    constant('API_URI', 'static/content.json').

    config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            }).
            state('home.category', {
                url: 'category/:category_id',
                templateUrl: 'templates/category.html',
                controller: 'CategoryController'
            }).
            state('home.item', {
                url: 'category/:category_id/:item_id',
                templateUrl: 'templates/category.item.html',
                controller: 'CategoryItemController'
            });
    }]).

    factory('DataSource', R24.DataSourceProvider).

    controller('MainController', R24.MainController).
    controller('HomeController', R24.HomeController).
    controller('CategoryController', R24.CategoryController).
    controller('CategoryItemController', R24.CategoryItemController);
