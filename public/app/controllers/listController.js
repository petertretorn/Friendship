(function(module) {

	module.controller('ListController', ListController);

	ListController.$inject = ['$location', 'dataService'];
	function ListController($location, dataService) {
		var vm = this;

		console.log('ListController!!');
		vm.profiles = [];

		init();

		function init() {
			dataService.getProfiles().then(onSuccess, onFailure);

			function onSuccess(data) {
				vm.profiles = data;
			}

			function onFailure(error) {
				console.log('boo.. error fetching profiles');
			}
		}

		vm.detailsView = function(profile) {
			$location.path('/detail/' + profile._id);
		}		

		vm.redirectToLogin = function() {
			$location.path('/login');
		}
		vm.message = 'List of Profiles';
	}

})(angular.module('app'));