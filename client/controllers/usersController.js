angular.module('myApp').controller('usersController', 
  ['$scope', 'UsersService', '$location', '$rootScope',
  function ($scope, UsersService, $location, $rootScope) {
    
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
      $rootScope.currentUser = user;
      var currentUser = '/users/' + user.username;
      $location.path(currentUser);
    }

    $scope.$on('$viewContentLoaded', function () {
      $scope.getAllUsers();
    });

}])