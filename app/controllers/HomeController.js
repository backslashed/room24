
R24.HomeController = ['$scope', 'DataSource', '$timeout', '$location', function($scope, dataSource, $timeout, $location) {

    dataSource.getSlides().
        then(function(data) {
            console.log(data);
        });

    $scope.isActive = function(cId) {
        var pathId = $location.path().split('/')[2];
        return angular.isUndefined(pathId) ? false : pathId == cId;
    }

    $scope.$on('$stateChangeStart', function() {
        $scope.contactVisible = false;
    });
}];