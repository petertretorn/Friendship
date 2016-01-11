(function(module) {

	module.controller('ListController', ListController);

	ListController.$inject = ['$location', '$state', 'dataService'];
	function ListController($location, $state, dataService) {
		var vm = this;

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

		vm.redirectToLogin = function() {
			$location.path('/login');
		}

		vm.gotoProfile = function(profile) {
			$state.go('profile', { username: profile.username} );
		}
	}

})(angular.module('app'));