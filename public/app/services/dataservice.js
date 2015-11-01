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

		function getUsers() {
			$http.get('http://localhost:3000/profiles').then(onSuccess, onFailure);

			function onSuccess(response) {
				console.log('succesfully fetched users...');
				return response.date;
			}
		}

		function onFailure(err) {
				console.log('err!!: ' + err);
			}

		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles
		};
	}

})(angular.module('app'));