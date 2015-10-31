(function(module) {

	module.controller('ListController', ListController);

	function ListController() {
		var vm = this;

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