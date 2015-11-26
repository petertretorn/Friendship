(function(module) {
	'use strict';

	module.controller('SignupController', SignupController);

	SignupController.$inject = ['$location', '$state', 'authService', 'modalService']
	function SignupController($location, $state, authService, modalService) {
		var vm = this;

		vm.signupModel = {};

		vm.signup = function() {

			authService.register(vm.signupModel).then(onSuccess, onFailure);

			function onSuccess(repsonse) {
				vm.signupModel = {};
				toastr.info('Registration successfull!');
				$state.go('edit');
			}

			function onFailure(repsonse) {
				toastr.info('Registration failure!');
			}
		}
	}

})(angular.module('app'));