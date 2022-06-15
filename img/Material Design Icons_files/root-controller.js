angular.module('main')
.controller('RootController', [
    '$scope', '$location', 'RootService',
    function ($scope, $location, RootService) {

        $scope.site = {
            name: '...'
        };

        var promiseSiteName = RootService.getName();
        promiseSiteName.then(function (name) {
            $scope.site.name = name;
        }, function () {
            // Error
        });

    }
]);