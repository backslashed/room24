
R24.HomeController = ['$scope', 'DataSource', function($scope, dataSource) {

    dataSource.getPage('home').
        then(function(data) {
            $scope.content = data;
        });

    dataSource.getCategories().
        then(function(categories) {
            $scope.categories = categories;
        });
}];