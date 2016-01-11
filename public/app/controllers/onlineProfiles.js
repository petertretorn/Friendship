(function(module) {

	'use strict';

	module.controller('OnlineController', OnlineController);

	OnlineController.$Inject = ['dataService']

	function OnlineController(dataService) {

		var vm = this;

		vm.profiles = [];

		init()

		function init() {
			dataService.getOnlineProfiles()
				.then(onSuccess, onError);

			function onSuccess(profiles) {
				vm.profiles = profiles;
			}

			function onError(error) {
				console.log('error : ' + error);
			}
		}

	}

})(angular.module('app'))