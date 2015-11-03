(function(module) {
	'use strict';

	module.controller('LoginController', LoginController);


	LoginController.$inject = ['dataService']
	function LoginController(dataService) {
		var vm = this;

		vm.loginModel = {};

		vm.login = function() {
			dataService.login(vm.loginModel);
		}
	}

})(angular.module('app'));