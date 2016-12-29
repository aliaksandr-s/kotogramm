angular.module('myApp').controller('userController', 
  ['$scope', '$rootScope',
  function ($scope, $rootScope) {

  $scope.$on('$viewContentLoaded', function () {
    $scope.pictures = $rootScope.currentUser.images
    $scope.username = $rootScope.currentUser.username
    console.log($rootScope.currentUser)
  });

}])