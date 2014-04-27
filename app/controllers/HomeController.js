
R24.HomeController = ['$scope', 'DataSource', '$timeout', '$location', function($scope, dataSource, $timeout, $location) {

    dataSource.getSlides().
        then(function(data) {
            $scope.content = {
                activeSlide: 0,
                slides: data,
                categories: data[0].items
            }
        });

    $scope.isActive = function(cId) {
        return cId == $scope.content.activeSlide - 1;
    }

    $scope.$on('$stateChangeStart', function() {
        $scope.contactVisible = false;
    });
}];