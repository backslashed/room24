
R24.HomeController = function($scope, $rootScope) {

    $scope.error = function(args) {
        if(angular.isUndefined(args)) {
            $rootScope.$emit('error:message', { message: 'hi', timeout: 5 });
        } else {
            $rootScope.$emit('error:clear');
        }
    }

    $scope.loading = function(args) {
        $rootScope.$emit(angular.isUndefined(args) ? 'network:loading' : 'network:idle');
    }
}