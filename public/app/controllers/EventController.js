https://github.com/petertretorn/friendship.git

(function(module) {
	'use strict';

	module.controller('EventController', EventController);

	EventController.$inject = ['$routeParams', 'dataService', 'mapService', 'modalService']
	function EventController($routeParams, dataService, mapService, modalService) {

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

			var domElement = document.getElementById('googleMap');

			var coordinates = { lat: vm.event.latlong[0], lng: vm.event.latlong[1]}


			var mapConfig = {
				addListener: false,
				addMarker: true,
				coordinates: coordinates
			}

			mapService.bootstrapMap(domElement, mapConfig);


			//mapService.addBounceMarkerToMap(map, coordinates);
		}

		vm.addComment = function() {
			modalService.textAreaInput("Add new Comment").then(function(text) {
				console.log('EventController: ' + text);

				var comment = {
					author: 'Iggy',
					text: text,
					datePosted: new Date()
				}

				vm.event.comments.push(comment)

				dataService.updateEvent(vm.event).then(function(event)
					{console.log('updated event: ' + event); },
				function() {});


			}, function(err) {

			});
		}

		function onError(err) {
				console.log('error : ' + err);
		}

	}


})(angular.module('app'));