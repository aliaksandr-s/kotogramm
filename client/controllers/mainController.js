angular.module('myApp').controller('mainController', ['$scope', '$http', 'Upload', '$timeout',
  function ($scope, $http, Upload, $timeout) {

    $scope.isDisabled = false;

    $scope.uploadPic = function (file) {
      $scope.isDisabled = true;

      Upload.upload({
        url: 'http://127.0.0.1:3000/pictures/save',
        method: 'POST',
        file: file
      }).then(function (res) {
        $scope.isDisabled = false;
        $scope.picFile = null;
        $scope.pictures.push(res.data);
      }).catch(function(err){
          console.log(err)
      })
    }

    $scope.getAllPics = function () {
      $http.get('http://127.0.0.1:3000/pictures/get-all')
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