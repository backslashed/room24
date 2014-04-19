
R24.HomeController = function($scope, $rootScope, dataSource) {

    dataSource.getContent().
        then(function(response) {
            $scope.content = !angular.isUndefined(response) ? response.data : angular.noop;
        });

}