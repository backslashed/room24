
R24.CategoryController = ['$scope', '$stateParams', 'DataSource', '$timeout', function($scope, $stateParams, dataSource, $timeout) {

    var cId = $stateParams['category_id'];

    $scope.content = {};

    dataSource.getCategory(cId).
        then(function(response) {
            $scope.content.page = response.category;
            $scope.content.items = {};
            $timeout(function() { $scope.content.items = response.items; }, 50);
            $scope.content.boxClass = 'boxes-items';
        });
}];