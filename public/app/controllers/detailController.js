(function(module) {

	module.controller('DetailController', DetailController);

	DetailController.$inject = ['$routeParams', 'dataService', 'authService', 'modalService']
	function DetailController($routeParams, dataService, authService, modalService) {

		//var id = $routeParams.id || authService.currentUser.username,
		var id = (authService.currentUser.signedIn) ? authService.currentUser.username : '',
			vm = this;
			vm.profile = {};

		
		vm.editField = function(field) {
			console.log('field attempted editted: ' + field);
			modalService.editField(vm.profile, field);
		}

		init();

		function init() {
			console.log('DetailController, id: %s', id);

			dataService.getProfileByUsername(id).then(onSuccess, onFailure);

			function onSuccess(data) {
				console.log('success fetching profile : %s', data[0].username);
				vm.profile = data[0];
				console.log(vm.profile.username);
			}

			function onFailure() {
				console.log('boo.. error fetching profile');
			}
			/*
			dataService.getProfileById(id).then(onSuccess, onFailure);

			function onSuccess(data) {
				console.log('successfetching profile : %s', data[0].username);
				vm.profile = data[0];
			}

			function onFailure(error) {
				console.log('boo.. error fetching profile');
			}*/
		}
	}
})(angular.module('app'));