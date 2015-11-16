(function(module) {
	'use strict';

	module.controller('navbarController', NavbarController) 

	NavbarController.$inject = ['$rootScope', 'identityService', 'modalService', 'authService']
	function NavbarController($rootScope, identityService, modalService, authService) {
		var vm = this;



		vm.isSignedIn = false;

		vm.signout = function() {
			authService.signout();
			//vm.signedIn = authService.isAuthenticated();
			console.log('signed in: ' + vm.signedIn);
			//modalService.showToast('You\'ve successfully benn signed out. Have a good day!', 'See You!');

			$rootScope.$broadcast('signedin');
		}

		$rootScope.$on("signedin", function() {
			//console.log('signedin: ' + authService.currentUser.username);
			vm.isSignedIn = identityService.isAuthenticated();

			console.log('authenticated: ' + identityService.isAuthenticated());
		});
	}


})(angular.module('app'));