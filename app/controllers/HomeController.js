
R24.HomeController = ['$scope', 'DataSource', '$location', function($scope, dataSource, $location) {

    dataSource.getPage('home').
        then(function(data) {
            $scope.content = data;
        });

    dataSource.getCategories().
        then(function(categories) {
            $scope.categories = categories;
        });

    $scope.isActive = function(cId) {
        var currentId = $location.path().split('/')[2];
        return angular.isUndefined(currentId) ? false : currentId == cId;
    }
}];