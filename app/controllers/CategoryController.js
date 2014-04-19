
R24.CategoryController = ['$scope', '$stateParams', 'DataSource', function($scope, $stateParams, dataSource) {

    var cId = $stateParams['category_id'];

    dataSource.getCategory(cId).
        then(function(response) {
            $scope.items = response.items;
            $scope.category = response.category;
        });

}];