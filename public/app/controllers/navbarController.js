(function(module) {
	'use strict';

	module.controller('navbarController', NavbarController) 

	NavbarController.$inject = ['$rootScope', 'identityService', 'modalService', 'authService', 'dataService', 'Socket']

	function NavbarController($rootScope, identityService, modalService, authService, dataService, Socket) {
		var vm = this;

		vm.isSignedIn = identityService.isAuthenticated();
		vm.messages = [];
		vm.newMessages = [];
		vm.membersOnline = 0;
		vm.status = {
			isopen: false
		};

		_init();

		function _init() {
			Socket.on('member.joining', function(message) {
	            toastr.info('Another member joined!');
	        });

	       	Socket.on('members.count', function(data) {
				vm.membersOnline = data.count;
			});
		}

		vm.signout = function() {
			authService.signout();
			$rootScope.$broadcast('signedin');
		}

		vm.showMessage = function(message) {
			modalService.showToast(message.content, message.from)
				.then(function() {
					var username = _getUserName();
					dataService.markMessageAsRead(message, username)
				.then(function(response) {
					if (response.success) {
						message.hasBeenRead = response.message.hasBeenRead;
					}
					_filterMessages();
				});
			});
		}

		vm.deleteMessage = function(message) {
			var username = _getUserName();
			dataService.deleteMessage(username, message)
				.then(function() {
					_.pull(vm.messages, message);
					toastr.info('Message has been deleted');
				})
		}

		$rootScope.$on("signedin", function() {
			vm.isSignedIn = identityService.isAuthenticated();
			vm.messages = identityService.currentUser.profile.messages;
			console.log('messsage: ' + vm.messages.length);
			_filterMessages();
		});

		function _filterMessages() {
			vm.newMessages = _.filter(vm.messages, function(message) {
				return (message.hasBeenRead === false);
			});
		}

		function _getUserName() {
			return identityService.currentUser.profile.username;
		}
	}

})(angular.module('app'));