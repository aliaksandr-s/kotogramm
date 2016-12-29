angular.module('myApp').controller('userController', 
  ['$scope', 'UsersService', '$routeParams', 'AuthService',
  function ($scope, UsersService, $routeParams, AuthService) {

    $scope.$on('$viewContentLoaded', function () {
      $scope.getUserByName($routeParams.user);
      $scope.checkIfAdmin()
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

    $scope.checkIfAdmin = function () {
      AuthService.isAdmin()
        .then(function (res) {
          $scope.isAdmin = res;
        })
        .catch(function (err) {
          console.log(err)
        })
    }

}])