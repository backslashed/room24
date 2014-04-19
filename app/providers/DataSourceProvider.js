
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

        getPage: function(pageName) {
            return getContent().then(function(response) {
                if(angular.isUndefined(response)) return;

                return response.data.pages[pageName];
            })
        },

        getCategories: function() {
            return getContent().then(function(response) {
                return angular.isUndefined(response) ? angular.noop : response.data.categories;
            });
        },

        getCategory: function(categoryId) {
            return getContent().then(function(response) {
                if(angular.isUndefined(response)) return;

                return {
                    items: _(response.data.items).filter(function(item) {
                        return item.category_id === categoryId;
                    }),
                    category: _(response.data.categories).findWhere({ id: categoryId })
                }
            });
        },

        getItem: function(itemId) {
            return getContent().then(function(response) {
                if(angular.isUndefined(response)) return;

                return _(response.data.items).findWhere({ id: itemId });
            });
        }
    }
}];