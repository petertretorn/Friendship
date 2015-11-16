(function(module) {
	'use strict';

	module.factory('identityService', IdentityService);

	function IdentityService() {
		var currentUser;

		function isAuthenticated() {
			return !!this.currentUser;
		}

		return {
			currentUser: currentUser,
			isAuthenticated: isAuthenticated
		};
	}

})(angular.module('app'))