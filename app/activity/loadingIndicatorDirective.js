
/**
 * @name loadingIndicator
 * @description
 * Example usage: <div loading-indicator [loading-class="loading-active"]></div>
 *
 * `loading-class` paramter is optional and defaults to `loading-active`. Directive toggles class on
 * `$rootScope` events `network:loading` and `network:idle`.
 */

Lobby.Activity.directive('loadingIndicator', ['$rootScope', '$animate', function($rootScope, $animate) {

    var compile = function(tElem, tAttr, transclude) {

        return function($scope, elem) {
            var loadingClass = $scope.loadingClass || 'loading-active';

            transclude($scope, function(clone) {
                tElem.append(clone);
            });

            $rootScope.$on('network:loading', function() {
                $animate.addClass(elem, loadingClass);
            });

            $rootScope.$on('network:idle', function() {
                $animate.removeClass(elem, loadingClass);
            });
        }

    }

    return {
        restrict: 'A',
        scope: {
            loadingClass: '@'
        },
        transclude: true,

        compile: compile
    }
}]);