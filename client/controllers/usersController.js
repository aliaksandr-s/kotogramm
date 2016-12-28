angular.module('myApp').controller('usersController', 
  ['$scope', 'UsersService', 
  function ($scope, UsersService) {
    
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

    $scope.$on('$viewContentLoaded', function () {
      $scope.getAllUsers();
    });

}])