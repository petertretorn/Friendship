(function(module) {
	'use strict';

	module.factory('identityService', IdentityService);

	IdentityService.$inject = ['localStorage'];
	
	function IdentityService(localStorage) {
		var currentUser = initialize(),
			USER_KEY = 'currentUser';

		function initialize() {
			var savedUser = localStorage.get( USER_KEY );

			var user = {
				signedIn: false
			}

			if (savedUser) {
				console.log('saved!: '+ savedUser);
				user.signedIn = true;
				user.username = savedUser.username;
				user.profile = savedUser.profile;
			}
			console.log(user.username);	
			return user;
		}

		function setCurrentUser(user) {

			currentUser.username = user.username			
			currentUser.signedIn = true;
			currentUser.profile = user;

			localStorage.add(USER_KEY, currentUser);
			console.log('idendityservice: ' + currentUser.username);
		}

		function clearCurrentUser() {
			localStorage.remove(USER_KEY);
			currentUser = initialize();
		}

		function isAuthenticated() {
			return currentUser.signedIn;
		}

		return {
			currentUser: currentUser,
			isAuthenticated: isAuthenticated,
			setCurrentUser: setCurrentUser,
			clearCurrentUser: clearCurrentUser
		};
	}

})(angular.module('app'))