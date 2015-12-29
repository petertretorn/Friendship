(function(module) {

	module.controller('MessagesController', MessagesController);

	MessagesController.$Inject =['identityService'];
	function MessagesController(identityService) {

		var vm = this;
		vm.messages = [];

		init();

		function init() {
			vm.messages = identityService.currentUser.profile.messages;
		}

	}

})(angular.module('app'));