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

			function onFailure(err) {
				console.log('err!!: ' + err);
			}
		}

		function getProfiles() {

		}

		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles
		};
	}

})(angular.module('app'));