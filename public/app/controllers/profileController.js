(function(module) {
	'use strict';

	module.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$routeParams', 'dataService'];
	function ProfileController($routeParams, dataService) {
		var vm = this;

		vm.profile = {};

		init();

		function init() {
			var username = $routeParams.username;

			console.log(username);

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