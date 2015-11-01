(function(module) {

	module.controller('ListController', ListController);


	ListController.$inject = ['dataService'];
	function ListController(dataService) {
		var vm = this;

		vm.profiles = [];

		init();

		function init() {
			dataService.getProfiles().then(onSuccess, onFailure);

			function onSuccess(data) {
				vm.profiles = data;
				console.log('profiles: ' + vm.profiles);
			}

			function onFailure(error) {
				console.log('boo.. error fetching profiles');
			}
		}

		vm.message = 'List of Profiles';
	}
})(angular.module('app'));