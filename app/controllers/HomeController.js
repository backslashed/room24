
R24.HomeController = ['$scope', 'DataSource', '$timeout', '$location', function($scope, dataSource, $timeout, $location) {

    dataSource.getPage('home').
        then(function(data) { $scope.content = data; });

    dataSource.getCategories()
        .then(function(categories) {
            $timeout(function() {
                $scope.categories = categories;
            });
        }, function(message) {
            dataSource.setActivity(false, message);
        });

    $scope.isActive = function(cId) {
        var pathId = $location.path().split('/')[2];
        return angular.isUndefined(pathId) ? false : pathId == cId;
    }
}];