angular.module('myApp').controller('settingsController', 
  ['$scope', 'SettingsService', 
  function ($scope, SettingsService) {
    
    //$scope.isPrivate = true;

    $scope.changePrivacy = function () {
      $scope.isPrivate = !$scope.isPrivate;
      console.log($scope.isPrivate)
    }

    $scope.getPrivacy = function () {
      SettingsService.getPrivacy()
        .then(function (res) {
          $scope.isPrivate = res.data.private;
          $scope.username = res.data.username;
        })
        .catch(function (err) {
          console.log(err)
        }) 
    }

    $scope.$on('$viewContentLoaded', function () {
      $scope.getPrivacy();
    })

}])