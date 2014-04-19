
R24.CategoryController = ['$scope', '$stateParams', 'DataSource', function($scope, $stateParams, dataSource) {

    var cId = $stateParams['category_id'];

    dataSource.getCategory(cId).
        then(function(response) {
            $scope.category = response.category;
            $scope.items = response.items;
        });

    $scope.activeCategoryId = cId;
}];