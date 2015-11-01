(function(module) {

	module.controller('ListController', ListController);


	ListController.$inject = ['dataService'];
	function ListController(dataService) {
		var vm = this;

		init();

		function init() {
			dataService.getProfiles().then(onSuccess, onFailure);

			function onSuccess(data) {
				var profiles = data
			}

			function onFailure(error) {
				console.log('boo.. error fetching profiles');
			}
		}

		vm.profiles = [
		{
			name: 'Peter',
			age: 41,
			sex: 'male'
		},
		{
			name: 'Mette',
			age: 36,
			sex: 'female'
		},
		{
			name: 'Thomas',
			age: 27,
			sex: 'male'
		},
		{
			name: 'Morten',
			age: 35,
			sex: 'male'
		}
		];

		vm.message = 'List of Profiles';
	}
})(angular.module('app'));