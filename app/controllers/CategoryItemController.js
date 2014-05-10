
R24.CategoryItemController = ['$scope', '$stateParams', 'DataSource', '$sce', function($scope, $stateParams, dataSource, $sce) {

    var itemId = $stateParams['item_id'],
        categoryId = $stateParams['category_id'];

    $scope.content = {
        categoryId: categoryId
    };

    dataSource.getItem(itemId).then(function(data) {
        $scope.content.item = data;
        $scope.content.mediaUri = $sce.trustAsResourceUrl("//player.vimeo.com/video/" + $scope.content.item.media_url);
    });

    dataSource.getCategory(categoryId).then(function(data) {
        $scope.content.siblings = _(data.items).without(_(data.items).findWhere({ id: parseInt(itemId, 10) }));
    });

}];