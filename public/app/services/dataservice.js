(function(module) {
	"use strict";

	module.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {
		
		function registerProfile(profile) {

			console.log('profile registered: ' + profile.firstName);

			$http.post('http://localhost:3000/register', profile).then(onSuccess, onFailure);

			function onSuccess(data) {
				console.log('succesfully registered new user: ' + profile.firstName);
			}
		}

		function getProfiles() {
			return $http.get('http://localhost:3000/api/profiles').then(onSuccess);

			function onSuccess(response) {
				console.log('succesfully fetched users...');
				return response.data;
			}
		}

		function getProfileById(id) {
			return $http.get('http://localhost:3000/api/profiles/' + id).then(onSuccess);

			function onSuccess(response) {
				console.log('succesfully fetched single profile...');
				return response.data;
			}	
		}

		function onFailure(err) {
				console.log('err!!: ' + err);
			}

		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles,
			getProfileById: getProfileById
		};
	}

})(angular.module('app'));