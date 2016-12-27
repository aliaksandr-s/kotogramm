angular.module('myApp').controller('mainController', ['$scope', '$http', 'Upload', '$timeout', 'PictureService',
  function ($scope, $http, Upload, $timeout, PictureService) {

    $scope.isDisabled = false;

    $scope.uploadPic = function (file) {
      $scope.isDisabled = true;

      PictureService.uploadPic(file)
        .then(function (res) {
          $scope.isDisabled = false;
          $scope.picFile = null;
          $scope.pictures.push(res.data);
        }).catch(function(err){
          console.log(err)
        })
    }

    $scope.getAllPics = function () {
      PictureService.getAllPics()
        .then(function (res) {
          if (res.data) {
            $scope.pictures = res.data;
          } else {
            $scope.pictures = [];
          }
        })
        .catch(function(err){
          console.log(err);
        })
    }

    $scope.$on('$viewContentLoaded', function () {
      $scope.getAllPics();
    });
  }
]);