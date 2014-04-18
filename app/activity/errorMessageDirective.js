
/**
 * @name errorMessage
 * @description
 * Example usage: <strong error-message [error-class="error-active"]></strong>
 *
 * `error-class` paramter is optional and defaults to `error-active`. Directive responds to `$rootScope`
 * events `error:message` and `error:clear`.
 *
 * `error:message` expects an object having key `message` and value as the error message.
 *
 */

Lobby.Activity.directive('errorMessage', ['$rootScope', '$animate', '$timeout', function($rootScope, $animate, $timeout) {

    var link = function($scope, elem) {

        var errorClass = $scope.errorClass || 'error-active',
            timeout    = void 0,

            clearError = function() {
                $animate.removeClass(elem, errorClass, function() {
                    $scope.error = {};
                });
            };

        $rootScope.$on('error:message', function(event, options) {

            var settings = angular.extend({
                message: 'A network error has occured. Please try again later or refresh the page',
                timeout: false
            }, options);

            $scope.message = settings.message;
            $animate.addClass(elem, errorClass);

            if (angular.isNumber(settings.timeout)) {
                $timeout.cancel(timeout);
                timeout = $timeout(clearError, settings.timeout * 1000);
            }
        });

        $rootScope.$on('error:clear', clearError);

    }

    return {
        restrict: 'A',
        scope: {
            errorClass: '@errorClass'
        },
        template: "{{message}}",

        link: link
    }

}]);