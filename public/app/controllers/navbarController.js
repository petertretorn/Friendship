(function(module) {
	'use strict';

	module.controller('navbarController', NavbarController) 

	NavbarController.$inject = ['$rootScope', 'identityService', 'modalService', 'authService']

	function NavbarController($rootScope, identityService, modalService, authService) {
		var vm = this;

		vm.isSignedIn = identityService.isAuthenticated();
		vm.messages = [];
		vm.newMessages = [];
		vm.status = {
			isopen: false
		};

		vm.signout = function() {
			authService.signout();
			$rootScope.$broadcast('signedin');
		}

		vm.showMessage = function(message) {
			modalService.showToast(message.content, message.from)
				.then(function() {
					message.hasBeenRead = true;
					_filterMessages();
					dataService.updateMessage(message);
				});
		}

		$rootScope.$on("signedin", function() {
			vm.isSignedIn = identityService.isAuthenticated();
			vm.messages = identityService.currentUser.profile.messages;

			_filterMessages();
		});

		function _filterMessages() {
			vm.newMessages = _.filter(vm.messages, function(message) {
				return (message.hasBeenRead === false);
			});
		}
	}

})(angular.module('app'));