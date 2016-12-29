angular.module('myApp').controller('userController', 
  ['$scope', 'UsersService', '$routeParams',
  function ($scope, UsersService, $routeParams) {

    $scope.$on('$viewContentLoaded', function () {
      $scope.getUserByName($routeParams.user);
    });

    $scope.getUserByName = function(username) {
      UsersService.getUserByName(username)
      .then(function (res) {
        $scope.pictures = res.data.images;
        $scope.username = res.data.username;
        $scope.error = false;
      })
      .catch(function (err) {
        $scope.error = true;
      })
  }

}])