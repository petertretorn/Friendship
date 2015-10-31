(function(module) {

	module.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['dataService'];

	function RegisterController(dataService) {
		var vm = this;

		vm.sex = ['male', 'female', 'trans'];

		vm.newProfile = {};

		vm.register = function() {
			console.log('submitted: ' + vm.newProfile.firstName, vm.newProfile.sex);

			dataService.registerProfile(vm.newProfile);
		}

		vm.message = 'Registration';
	}
})(angular.module('app'));