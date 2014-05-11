
R24.CategoryController = ['$scope', 'DataSource', '$location', '$anchorScroll', '$rootScope',
    function($scope, dataSource, $location, $anchorScroll, $rootScope) {

    var preselectedSlide = angular.isDefined($location.search().slide) ? $location.search().slide : 0;

    dataSource.getSlides().
        then(function(data) {
            $scope.content = {
                activeSlide: preselectedSlide,
                slides: data,
                categories: data[0].items
            }
        });

    $rootScope.backButtonText = "HOME";

    $scope.isActive = function(cId) {
        return cId == $scope.content.activeSlide - 1;
    }

    $scope.$watch('content.activeSlide', function(slideNumber) {
        if(angular.isNumber(slideNumber)) {
            $location.search('slide', slideNumber);
        }
    });

    $scope.$on('$locationChangeStart', function() {
        $scope.contactVisible = false;

        $rootScope.backButtonText = "HOME";

        if(angular.isDefined($location.search().slide)) {
            $scope.content.activeSlide = $location.search().slide;
        }
    });

    $scope.goBack = function() {
        var locationParams = $location.url().split('/');

        if(locationParams[1] === 'category') {
            history.back();
            return true;
        }

        $scope.content.activeSlide = 0;
    }

    $scope.$on('$stateChangeSuccess', function() { $anchorScroll(); });
}];