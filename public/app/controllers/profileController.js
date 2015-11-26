(function(module) {
	'use strict';

	module.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$stateParams', 'dataService'];
	function ProfileController($stateParams, dataService) {
		var vm = this;

		vm.profile = {};

		init();

		function init() {
			var username = $stateParams.username;

			dataService.getProfileByUsername(username)
				.then(function(profile) {
					vm.profile = profile;
					vm.keys = Object.keys(profile);

					console.log(profile.username);
				}, function(err) {
					console.log(err);
				});
		}
	}

})(angular.module('app'));