
R24.MainController = ['$scope', 'DataSource', function($scope, dataSource) {

    dataSource.getCategories().
        then(function(categories) {
            $scope.categories = categories;
        }, function(msg) {
            dataSource.setActivity(false, msg);
        });

}];