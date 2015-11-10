(function(module) {
	'use strict';

	module.controller('EventController', EventController);

	EventController.$inject = ['$routeParams', 'dataService']
	function EventController($routeParams, dataService) {

		var vm = this,
			eventId = $routeParams.eventId;

		vm.event = {}

		init();

		function init() {
			dataService.getEventById(eventId).then(function(event) {
				vm.event = event;
			}, function(err) {
				console.log('error : ' + err);
			})
		}

	}


})(angular.module('app'));