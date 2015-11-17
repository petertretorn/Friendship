(function(module) {
	'use strict';

	module.factory('identityService', IdentityService);

	function IdentityService() {
		var currentUser;

		function getCurrentUser() {
			return currentUser;
		}

		function isAuthenticated() {
			return !!this.currentUser;
		}

		return {
			currentUser: currentUser,
			isAuthenticated: isAuthenticated,
			getCurrentUser: getCurrentUser
		};
	}

})(angular.module('app'))