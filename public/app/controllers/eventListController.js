(function(module) {
	'use strict';

	module.controller('EventListController', EventListController);

	EventListController.$inject = ['dataService', 'settings'];
	function EventListController(dataService, settings) {
		var vm = this,
			baseUrl = settings.baseUrl;

		vm.events = [];

		init();

		function init() {
			dataService.getEvents('baseUrl' + 'events').then(onSuccess, onFailure);

			function onSuccess(events) {
				vm.events = events;
			}

			function onFailure(err) {
				console.log('Error: ' + err);
			}
		}
	}


})(angular.module('app'));