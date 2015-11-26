(function(module) {
	"use strict";

	module.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {
		
		function registerProfile(profile) {

			$http.post('/api/register', profile).then(onSuccess, onFailure);
		}

		function getProfiles() {
			return $http.get('/api/profiles')
				.then(onSuccess, onFailure);
		}

		function getProfileByUsername(username) {
			return $http.get('/api/profiles/' + username)
				.then(onSuccess, onFailure);
		}

		function updateProfile(profile) {

			return $http.put('/api/profiles/' + profile.username, profile)
				.then(onSuccess, onFailure);
		}

		function createEvent(event) {
			 return $http.post('/api/events', event)
			 	.then(onSuccess, onFailure);
		}

		
		function getEvents() {
			return $http.get('/api/events/')
				.then(onSuccess, onFailure);
		}		

		function getEventById(id) {
			return $http.get('/api/events/' + id)
				.then(onSuccess, onFailure);
		}

		function updateEvent(event) {
			console.log('eventid: ' + event._id);
			return $http.put('/api/events/' + event._id, event)
				.then(onSuccess, onFailure);
		}

		function onSuccess(response) {
			return response.data;
		}

		function onFailure(err) {
			console.log('err!!: ' + err);
		}

		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles,
			getProfileByUsername: getProfileByUsername,
			updateProfile: updateProfile,
			
			getEvents: getEvents,
			createEvent: createEvent,
			getEventById: getEventById,
			updateEvent: updateEvent
		};
	}

})(angular.module('app'));