(function(module) {
	'use strict';

	module.factory('identityService', IdentityService);

	function IdentityService() {
		var currentUser;

		function getCurrentUserName() {
			return currentUser;
		}

		function isAuthenticated() {
			return !!this.currentUser;
		}

		return {
			currentUser: currentUser,
			isAuthenticated: isAuthenticated,
			getCurrentUserName: getCurrentUserName
		};
	}

})(angular.module('app'))