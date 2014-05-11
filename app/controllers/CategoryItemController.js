
R24.CategoryItemController = ['$scope', '$stateParams', 'DataSource', '$sce', '$rootScope', function($scope, $stateParams, dataSource, $sce, $rootScope) {

    var itemId = $stateParams['item_id'],
        categoryId = $stateParams['category_id'];

    $scope.content = {
        categoryId: categoryId
    };

    dataSource.getItem(itemId).then(function(data) {
        $scope.content.item = data;
        $scope.content.mediaUri = $sce.trustAsResourceUrl("//player.vimeo.com/video/" +
                                  $scope.content.item.media_url +
                                  "?title=0&byline=0&badge=1&portrait=0&color=33ccff&api=1&player_id=room24video&autoplay=0");
    });

    dataSource.getCategory(categoryId).then(function(data) {
        $scope.content.siblings = _(data.items).without(_(data.items).findWhere({ id: parseInt(itemId, 10) }));
        $rootScope.backButtonText = data.category.title;
    });

    // Vimeo load

    var mediaFrame = document.getElementById('item-media');

    var post = function(method, value) {
        var url = url || mediaFrame.src.split('?')[0];
        mediaFrame.contentWindow.postMessage(JSON.stringify({ method: method, value: value }), url);
    }

    angular.element(mediaFrame).bind('load', function() {
        post('addEventListener', 'loadProgress');
        post('addEventListener', 'play');
        post('addEventListener', 'pause');
        // + ready
        post('play', '');
    });

    window[ window.addEventListener ? 'addEventListener' : 'attachEvent' ]('message', onMessageReceived, false);

    var hasLoaded = false;

    function onMessageReceived(e) {
        var data = JSON.parse(e.data);

        if( data.event === 'play') {
            TweenMax.to(mediaFrame, 0.3, { opacity: 1, scale: 1 });
            angular.element(document.getElementsByTagName('footer')[0]).addClass('dim');
            hasLoaded = true;
        } else if ( data.event === 'pause' ) {
            angular.element(document.getElementsByTagName('footer')[0]).removeClass('dim');
        }
    }
}];