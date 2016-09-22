var momentumArtApp = angular.module('momentumArtApp', [])

	.controller('backgroundImage', ['$scope','$http', function($scope, $http){
		$http.get('').then(function(response){
			console.log(response)
		})
	}])

