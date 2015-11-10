(function(module) {
	'use strict';

	module.controller('EventController', EventController);

	EventController.$inject = ['$routeParams', 'dataService', 'mapService']
	function EventController($routeParams, dataService, mapService) {

		var vm = this,
			eventId = $routeParams.eventId;

		vm.event = {},
		vm.tabs = [{ title: 'Comments', active: true}, { title: 'Google Map', active: false }];
		vm.commentsActive = true;

		init();

		function init() {
			dataService.getEventById(eventId).then(onEventFetched, onError);
		}

		function onEventFetched(event) {
			vm.event = event;

			var map = document.getElementById('googleMap');

			//var LatLng = {lat: data.coords.latitude, lng: data.coords.longitude};

			var coordinates = { lat: vm.event.latlong[0], lng: vm.event.latlong[1]}

			mapService.bootstrapMap(map, coordinates);
		}

		function onError(err) {
				console.log('error : ' + err);
		}

	}


})(angular.module('app'));