(function(module) {

	module.controller('DetailController', DetailController);

	DetailController.$inject = ['$routeParams', 'dataService']
	function DetailController($routeParams, dataService) {

		var id = $routeParams.id,
			vm = this;
			vm.profile = {};

		init();

		function init() {
			console.log('id: %s', id);

			dataService.getProfileById(id).then(onSuccess, onFailure);

			function onSuccess(data) {
				console.log('successfetching profile : %s', data[0].username);
				vm.profile = data[0];
			}

			function onFailure(error) {
				console.log('boo.. error fetching profile');
			}
		}
	}
})(angular.module('app'));