(function(module) {
	'use strict';

	module.controller('SignupController', SignupController);


	SignupController.$inject = ['$location', 'authService', 'modalService']
	function SignupController($location, authService, modalService) {
		var vm = this;

		vm.signupModel = {};

		vm.signup = function() {

			authService.register(vm.signupModel).then(onSuccess, onFailure);

			function onSuccess(repsonse) {
				//clear form
				vm.signupModel = {};

				var heading = 'Welcome On Board',
					content = 'You\'ve signed up successfully! Welcome onboard the Friendship!. Enjoy your trip!'

				//	modalService.showToast(content, heading);

				$location.path('#/');
			}

			function onFailure(repsonse) {
				console.log('boo... failure!!');
			}
		}
	}

})(angular.module('app'));