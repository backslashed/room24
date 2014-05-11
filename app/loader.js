
var R24 = R24 || {}; // namespace

require.config({
    baseUrl: 'app',

    paths: {
        'libs': '../libs',
        'TweenMax': '//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min'
    }
});

require(['libs/angular.min'], function() {

   require([
       'libs/angular-animate.min',
       'libs/angular-route.min',
       'libs/angular-sanitize.min',
       'libs/angular-touch.min',
       'libs/angular-ui-router.min',
       'libs/underscore-min',
       'TweenMax',
       'libs/ScrollToPlugin'], function() {

       require([
           'controllers/CategoryController',
           'controllers/AboutController',
           'controllers/CategoryItemController',

           'directives/NavBox',

           'providers/DataSourceProvider'], function() {

           require(['app'], function() {
               angular.bootstrap(document, ['Room24']);
           });

       });
   })
});