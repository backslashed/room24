
R24.CategoryItemController = ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.it = $stateParams['item_id'];
    $scope.cat = $stateParams['category_id'];
}];