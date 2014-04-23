
R24.CategoryController = ['$scope', '$stateParams', 'DataSource', function($scope, $stateParams, dataSource) {

    var cId = $stateParams['category_id'];

    $scope.content = {};

    dataSource.getCategory(cId).
        then(function(response) {
            $scope.content.page = response.category;
            $scope.content.items = response.items;
            $scope.content.boxClass = 'boxes-items';
        });
}];