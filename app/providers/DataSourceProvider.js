
R24.DataSourceProvider = function($http, $rootScope, API_URI) {

    return {
        getContent: function() {
            $rootScope.network = {
                active: true,
                error: false
            }

            return $http.get(API_URI).
                then(function(result) {
                    $rootScope.network = {
                        active: false,
                        error: false
                    }

                    return result;
                }, function() {
                    $rootScope.network = {
                        active: false,
                        error: '404 - Error'
                    }
                });
        }
    }
}