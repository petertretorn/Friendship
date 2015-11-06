(function(module) {
	'use strict';

	module.controller('LoginController', LoginController);


	LoginController.$inject = ['$location', 'authService', 'modalService']
	function LoginController($location, authService, modalService) {
		var vm = this;

		vm.loginModel = {};

		vm.login = function() {
			authService.login(vm.loginModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				var heading = 'Login Succesfull',
					content = 'You\'ve looged in successfully! Welcome back!'

				modalService.showToast(content, heading);

			$location.path('#/');
			}
			
			function onFailure(response) {
				var heading = 'Login failed',
					content = 'Keep trying!!'

				modalService.showToast(content, heading);
			}
		}
	}

})(angular.module('app'));