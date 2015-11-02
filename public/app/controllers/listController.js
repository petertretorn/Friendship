(function(module) {

	module.controller('ListController', ListController);

	ListController.$inject = ['$location', 'dataService'];
	function ListController($location, dataService) {
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

		vm.showDetails = function(_id) {
			console.log('id : %s', _id);
			$location.href = '#/detail/';
		}
		vm.message = 'List of Profiles';
	}

})(angular.module('app'));