
R24.HomeController = ['$scope', 'DataSource', '$timeout', '$location', function($scope, dataSource, $timeout, $location) {

    dataSource.getSlides().
        then(function(data) {
            $scope.content = {
                activeSlide: 0,
                slides: data,
                categories: data[0].items
            }
        });

    $scope.isActive = function(cId) {
        var pathId = $location.path().split('/')[2];
        return angular.isUndefined(pathId) ? false : pathId == cId;
    }

    $scope.$on('$stateChangeStart', function() {
        $scope.contactVisible = false;
    });
}];