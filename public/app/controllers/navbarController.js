(function(module) {
	'use strict';

	module.controller('navbarController', NavbarController) 

	NavbarController.$inject = ['$rootScope', 'authService', 'modalService']
	function NavbarController($rootScope, authService, modalService) {
		var vm = this;

		vm.signedIn = authService.currentUser.signedIn;

		vm.signout = function() {
			authService.signout();
			vm.signedIn = authService.currentUser.signedIn;
			console.log('status: ' + vm.signedIn);
			modalService.showToast('You\'ve successfully benn signed out. Have a good day!', 'See You!');

			$rootScope.$broadcast('signedin');

		}

		

		$rootScope.$on("signedin", function() {
			vm.signedIn = authService.currentUser.signedIn;
		});
	}


})(angular.module('app'));