
'use strict';

var app = angular.module('Room24', [
   'ngAnimate',
   'ngRoute',
   'ngSanitize',
   'ngTouch',
   'ngSanitize',
   'ui.router'
]);

app.
    constant('API_URI', 'static/content.live.json').

    config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('page', {
                url: '/',
                templateUrl: 'templates/page.html',
                controller: 'CategoryController'
            }).
            state('page.item', {
                url: 'category/:category_id/:item_id',
                templateUrl: 'templates/category.item.html',
                controller: 'CategoryItemController'
            }).
            state('page.about', {
                url: 'about',
                templateUrl: 'templates/about.html',
                controller: 'AboutController'
            });
    }]).

    factory('DataSource', R24.DataSourceProvider).

    controller('CategoryController', R24.CategoryController).
    controller('AboutController', R24.AboutController).
    controller('CategoryItemController', R24.CategoryItemController).

    directive('navBox', R24.NavBox);

