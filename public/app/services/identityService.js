(function(module) {
	'use strict';

	module.factory('identityService', IdentityService);

	IdentityService.$inject = ['localStorage'];
	
	function IdentityService(localStorage) {
		var currentUser = initialize();

		function initialize() {
			var savedUser = localStorage.get('currentUser');

			var user = {
				signedIn: false
			}

			if (savedUser) {
				console.log('saved!: '+ savedUser);
				user.signedIn = true;
				user.username = savedUser.username;
			}
			console.log(user.username);	
			return user;
		}

		function setCurrentUser(user) {
			console.log(user.username);
			localStorage.add('currentUser', user);
			user.signedIn = true;
			currentUser = user;
		}

		function clearCurrentUser() {
			localStorage.remove('currentUser');
			currentUser = initialize;
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