angular.module('myApp').controller('usersController', 
  ['$scope', 'UsersService', '$location',
  function ($scope, UsersService, $location) {
    
    $scope.getAllUsers = function () {
      UsersService.getAllUsers()
        .then(function (res) {
          $scope.users = res.data;
          console.log($scope.users)
        })
        .catch(function (err) {
          console.log(err)
        })
    }

    $scope.showUser = function (user) {
      var currentUser = '/users/' + user.username;
      $location.path(currentUser);
    }

    $scope.$on('$viewContentLoaded', function () {
      $scope.getAllUsers();
    });

}])