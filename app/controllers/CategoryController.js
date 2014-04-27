
R24.CategoryController = ['$scope', 'DataSource', '$location', function($scope, dataSource, $location) {

    var preselectedSlide = angular.isDefined($location.search().slide) ? $location.search().slide : 0;

    dataSource.getSlides().
        then(function(data) {
            $scope.content = {
                activeSlide: preselectedSlide,
                slides: data,
                categories: data[0].items
            }
        });

    $scope.isActive = function(cId) {
        return cId == $scope.content.activeSlide - 1;
    }

    $scope.$watch('content.activeSlide', function(slideNumber) {
        if(angular.isNumber(slideNumber)) {
            $location.search('slide', slideNumber);
        }
    });

    $scope.$on('$locationChangeStart', function() {
        $scope.contactVisible = false;

        if(angular.isDefined($location.search().slide)) {
            $scope.content.activeSlide = $location.search().slide;
        }
    });
}];