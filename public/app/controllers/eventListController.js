(function(module) {
	'use strict';

	module.controller('EventListController', EventListController);

	EventListController.$inject = ['$state', 'dataService', 'settings'];
	function EventListController($state, dataService, settings) {
		var vm = this,
			baseUrl = settings.baseUrl;

		vm.events = [];

		vm.tabs = [
			{ text: 'List', state: 'all-events.list' },
            { text: 'Calender', state: 'all-events.calender' }
        ];

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

		vm.gotoEvent = function(id) {
			$state.go('event', { eventId: id} );
		}
	}


})(angular.module('app'));