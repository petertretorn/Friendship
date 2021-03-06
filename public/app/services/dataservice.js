(function(module) {
	"use strict";

	module.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {
		
		/* ----------------------- Profiles --------------------------------------------- */

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


		function getOnlineProfiles() {
			return $http.get('/api/profiles/online')
				.then(onSuccess, onFailure);
		}

		/* ----------------------- Messages --------------------------------------------- */

		function sendMessage(receiver, message) {
			var url = getMessageUrlForUser(receiver);
			return $http.post(url, message)
				.then(onSuccess, onFailure);
		}

		function getMessagesForUser(username) {
			var url = getMessageUrlForUser(username);
			return $http.get(url)
				.then(onSuccess, onFailure);
		}

		function getMessageUrlForUser(receiver) {
			var url = 'api/profiles/' + receiver + '/messages';
			return url;
		}

		function markMessageAsRead(message, username) {
			var url = 'api/profiles/' + username + '/messages/' + message._id;
			return $http.put(url, message)
				.then(onSuccess, onFailure);
		}

		function deleteMessage(username, message) {
			var url = 'api/profiles/' + username + '/messages/' + message._id;
			return $http.delete(url)
				.then(onSuccess, onFailure);
		}

		/* ----------------------- Events --------------------------------------------- */

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
			//profile
			registerProfile: registerProfile,
			getProfiles: getProfiles,
			getProfileByUsername: getProfileByUsername,
			updateProfile: updateProfile,
			getOnlineProfiles: getOnlineProfiles,
			
			//messages
			sendMessage :sendMessage,
			getMessagesForUser: getMessagesForUser,
			markMessageAsRead:markMessageAsRead,
			deleteMessage: deleteMessage,
			
			//events
			getEvents: getEvents,
			createEvent: createEvent,
			getEventById: getEventById,
			updateEvent: updateEvent
		};
	}

})(angular.module('app'));