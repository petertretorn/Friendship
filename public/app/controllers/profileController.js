(function(module) {
	'use strict';

	module.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$stateParams', 'dataService', 'modalService', 'identityService'];
	function ProfileController($stateParams, dataService, modalService, identityService) {
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

		vm.sendMessage = function(reciever) {
			var message = {};
			message.from = identityService.getCurrentUser().username;

			modalService.textAreaInput('Enter message to ' + reciever)
				.then(function(text) {
					message.content = text;
					dataService.sendMessage(reciever, message)
				.then(function(response) {
					console.log('success: ' + response.success);
					toastr.info('Message has been sent');
				})
			})
		}

		vm.isAuthenticated = function() {
			return identityService.isAuthenticated();
		}
	}

})(angular.module('app'));