
R24.HomeController = ['$scope', '$rootScope', 'DataSource', function($scope, $rootScope, dataSource) {

    dataSource.getContent().
        then(function(response) {
            $scope.content = !angular.isUndefined(response) ? response.data : angular.noop;
        });

}];