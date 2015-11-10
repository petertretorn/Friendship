(function(module) {
	"use strict";

	module.factory('dataService', dataService);

	dataService.$inject = ['$http', 'settings'];

	function dataService($http, settings) {
		
		var baseUrl = settings.baseUrl;

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

		function getProfileByUsername(username) {
			return $http.get(baseUrl + 'api/profiles/' + username).then(onSuccess);

			function onSuccess(response) {
				console.log('succesfully fetched single profile by username...');
				return response.data;
			}	
		}

		function updateProfile(profile) {
			console.log('updating profile: ' + profile.username);

			return $http.put(baseUrl + 'api/profiles/' + profile.username, profile).then(onSuccess, onFailure);

			function onSuccess(data) {
				console.log('succesfully pdated profile: ' + profile.username);
				return profile;
			}
		}

		function createEvent(event) {
			 return $http.post(baseUrl + 'api/events', event).then(onSuccess, onFailure);

			 function onSuccess(data) {
				console.log('succesfully created events: ');
			}
		}

		function onFailure(err) {
				console.log('err!!: ' + err);
			}



		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles,
			getProfileById: getProfileById,
			getProfileByUsername: getProfileByUsername,
			updateProfile: updateProfile,
			createEvent: createEvent
		};
	}

})(angular.module('app'));