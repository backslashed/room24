
R24.DataSourceProvider = ['$http', '$rootScope', '$timeout', '$q', 'API_URI', function($http, $rootScope, $timeout, $q, API_URI) {

    var delayTimeout;
    var _contentCache = void 0;

    function setActivity(active, msg) {
        $timeout.cancel(delayTimeout);

        delayTimeout = $timeout(function() {
            $rootScope.network = {
                active: active,
                error: angular.isUndefined(msg) ? false : msg
            }

        }, 1000); // give reasonable wait time

    }

    return {
        getContent: function() {
            if(angular.isUndefined(_contentCache)) {
                setActivity(true);

                return $http.get(API_URI).
                        then(
                        function(result) {
                            setActivity(false);
                            _contentCache = result;
                            return result;

                        }, function() {
                            setActivity(false, '404 - A network error has occurred. Please try refreshing');
                        });

            } else {
                var defer = $q.defer();
                defer.resolve(_contentCache);
                return defer.promise;

            }
        }
    }
}];