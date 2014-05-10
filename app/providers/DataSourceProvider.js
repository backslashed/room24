'use strict';

R24.DataSourceProvider = ['$http', '$rootScope', '$timeout', '$q', 'API_URI', function($http, $rootScope, $timeout, $q, API_URI) {

    var _delayTimeout,
        _contentCache = void 0,
        _imageCache   = void 0,

        _ERROR_MSG    = "Error 404: Can not retrieve data. Please try again.",
        _ERROR_IMG    = "Error preloading thumbnails: ",
        _cachingPhase = false;

    /* Sets network status (active/inactive/error) */

    function setActivity(active, msg) {
        $timeout.cancel(_delayTimeout);

        _delayTimeout = $timeout(function() {
            $rootScope.network = {
                active: active,
                error: angular.isUndefined(msg) ? false : msg
            }
        }, active ? 400 : 0); // give reasonable time on load (40ms)
    }

    /* Fetches all content and saves to cache */

    function getContent() {
        setActivity(true);

        if(angular.isUndefined(_contentCache)) {
            return $http.get(API_URI).
                then(
                    function(result) {
                        if(!_cachingPhase) setActivity(false);
                        _contentCache = result;
                        return result;
                    },
                    function() {
                        setActivity(false, _ERROR_MSG);
                    });

        } else {
            var defer = $q.defer();
            defer.resolve(_contentCache);
            setActivity(false);
            return defer.promise;

        }
    }

    /* Preload thumbnails */

    function preloadThumbnails(result) {
        var defer = $q.defer();
        _imageCache = new Array();

        setActivity(true);
        _cachingPhase = true;

        try {
            for(var i = 0; i < result.length; i++) {
                angular.forEach(result[i].items, function(item) {
                    var img = new Image();
                    img.src = item.thumbnail;
                    _imageCache.push(img);
                });
            }

            setActivity(false);
            _cachingPhase = false;
            defer.resolve(result);
        }
        catch (msg) {
            setActivity(false);
            _cachingPhase = false;
            defer.reject(_ERROR_IMG + msg);
        }

        return defer.promise;
    }

    var transformContent = function(result) {
        var slides = [{
            "body": result.data.pages["home"].body,
            "contact": result.data.pages["contact"],
            "items": result.data.categories,
            "boxClass": "boxes"
        }];

        angular.forEach(result.data.categories, function(val) {
            slides.push({
                "body": val.body,
                "items": filterCategoryItems(val.id, result.data.items),
                "category_id": val.id,
                "boxClass": "boxes-items"
            });
        });

        return slides;
    }

    var filterCategoryItems = function(categoryId, items) {
        return _(items).filter(function(item) {
            return item.category_id.indexOf(categoryId) !== -1;
        });
    }

    /* Filter fetched content */

    return {
        setActivity: setActivity,

        getPage: function(pageName) {
            return getContent().then(function(response) {
                return angular.isUndefined(response) ?
                    angular.noop : response.data.pages[pageName];
            })
        },

        getCategory: function(categoryId) {
            return getContent().then(function(response) {
                return angular.isUndefined(response) ?
                    angular.noop : {
                        items: filterCategoryItems(parseInt(categoryId, 10), response.data.items),
                        category: _(response.data.categories).findWhere({ id: parseInt(categoryId, 10) })
                    }
            });
        },

        getItem: function(itemId) {
            return getContent().then(function(response) {
                return angular.isUndefined(response) ?
                    angular.noop : _(response.data.items).findWhere({ id: parseInt(itemId, 10) });
            });
        },

        getSlides: function() {
            return getContent().
                then(transformContent).
                then(preloadThumbnails);
        }
    }
}];