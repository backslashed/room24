
R24.AboutController = ['$scope', 'DataSource', function($scope, dataSource) {

    dataSource.getPage('about').
        then(function(data) {
            $scope.content = data;
        });

}];