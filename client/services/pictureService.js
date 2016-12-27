angular.module('myApp').factory('PictureService', 
	['$q', 'Upload', '$http', 
	function($q, Upload, $http) {
		
		return ({
			uploadPic: uploadPic,
			getAllPics: getAllPics
		})

		function uploadPic (file) {

			var deferred = $q.defer();
      
			Upload.upload({
        url: 'http://127.0.0.1:3000/pictures/save',
        method: 'POST',
        file: file
      })
			.then(function (data) {
				deferred.resolve(data)
      })
			.catch(function(err){
				deferred.reject(err);
      })
			return deferred.promise;
    }


		function getAllPics() {
			
			var deferred = $q.defer();

      $http.get('http://127.0.0.1:3000/pictures/get-all')
        .then(function (data) {
					deferred.resolve(data)
        })
        .catch(function(err){
					deferred.reject(err)
        })
			return deferred.promise;
    }

}])