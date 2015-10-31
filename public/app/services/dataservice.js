(function(module) {
	"use strict";

	module.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {
		
		function registerProfile(profile) {
			console.log('profile registered: ' + profile.firstName);
		}

		function getProfiles() {

		}

		return {
			registerProfile: registerProfile,
			getProfiles: getProfiles
		};
	}

})(angular.module('app'));