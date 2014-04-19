
R24.CategoryItemController = ['$scope', '$stateParams', 'DataSource', function($scope, $stateParams, dataSource) {

    var itemId = $stateParams['item_id'];

    dataSource.getItem(itemId).
        then(function(item) {
            $scope.item = item;
        });

}];