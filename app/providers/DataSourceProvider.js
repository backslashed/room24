
R24.DataSourceProvider = ['$http', '$rootScope', '$timeout', '$q', 'API_URI', function($http, $rootScope, $timeout, $q, API_URI) {

    var delayTimeout,
        _contentCache = void 0,
        _ERROR_MSG    = "Error 404: Can not retrieve data. Please try again."

    function setActivity(active, msg) {
        $timeout.cancel(delayTimeout);

        delayTimeout = $timeout(function() {
            $rootScope.network = {
                active: active,
                error: angular.isUndefined(msg) ? false : msg
            }
        }, 1000); // give reasonable wait time

    }

    function getContent() {
        if(angular.isUndefined(_contentCache)) {
            setActivity(true);

            return $http.get(API_URI).
                then(function(result) {
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

    return {
        setActivity: setActivity,

        getCategories: function() {
            var defer = $q.defer();

            getContent().
                then(function(response) {
                    defer.resolve(angular.isUndefined(response) ? angular.noop : response.data.categories);
                });

            return defer.promise;
        }
    }
}];