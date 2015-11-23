(function(module) {
	'use strict';

	module.controller('LoginController', LoginController);


	LoginController.$inject = ['$location', 'authService', 'modalService', 'redirectService']
	function LoginController($location, authService, modalService, redirectService) {
		var vm = this;

		vm.loginModel = {};

		vm.login = function() {
			authService.login(vm.loginModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				toastr.info('Logged in succesfully!');
				redirectService.reditctToLastState();
			}
			
			function onFailure(response) {
				toastr.info('Username or password incorrect!');

				vm.loginModel = {};
			}
		}
	}

})(angular.module('app'));