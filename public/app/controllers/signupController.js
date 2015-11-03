(function(module) {
	'use strict';

	module.controller('SignupController', SignupController);


	SignupController.$inject = ['authService']
	function SignupController(authService) {
		var vm = this;

		console.log('inside controller signing up!!');

		vm.signupModel = {};

		vm.signup = function() {

				console.log('inside signing up!!');


			authService.signUp(vm.signupModel).then(onSuccess, onFailure);

			function onSuccess(repsonse) {
				console.log('signed up succesfully!!');
			}

			function onFailure(repsonse) {
				console.log('boo... failure!!');
			}
		}
	}

})(angular.module('app'));