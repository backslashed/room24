
var R24 = R24 || {}; // namespace

require.config({
    baseUrl: 'app',

    paths: {
        'libs': '../libs'
    }
});

require(['libs/angular.min'], function() {

   require([
       'libs/angular-animate.min',
       'libs/angular-route.min',
       'libs/angular-sanitize.min',
       'libs/angular-touch.min'], function() {

       require([
           'home/controller',
           'providers/DataSourceProvider'], function() {

           require(['app'], function() {
               angular.bootstrap(document, ['Room24']);
           });

       });
   })
});