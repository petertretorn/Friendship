(function(module) {
	'use strict';

	module.controller('CreateEventController', CreateEventController);

	CreateEventController.$inject = ['$rootScope', '$scope', '$location', '$state' ,'dataService', 'mapService'];
	function CreateEventController($rootScope, $scope, $location, $state, dataService, mapService) {
		var vm = this,
			map;

		vm.newEvent = {};
		vm.newEvent.time = moment().minute(0).hour(8);
		vm.format = 'dd-MMMM-yyyy';
	  	vm.status = {
			opened: false
		}

		init();

		function init() {
			var domElement;

			mapService.getHtml5Location().then(function(coordinates) {
				domElement = document.getElementById('googleMap');

				var mapConfig = {
					addListener: true,
					addMarker: false,
					coordinates: coordinates
				}

				mapService.bootstrapMap(domElement, mapConfig)
			});
		}

		$rootScope.$on('map-clicked', function(event, coordinates) {
			vm.newEvent.latlong = coordinates;
			toastr.info('Location has been selected!');
		});

	  	vm.open = function($event) {
	    	vm.status.opened = true;
	  	};

		vm.createEvent = function() {

			vm.newEvent.date = combineDateAndTime(vm.newEvent.date,vm.newEvent.time);
			delete vm.newEvent.time;

			dataService.createEvent(vm.newEvent).then(function(event) {
				vm.newEvent = {};
				toastr.info('Event created succesfully', 'Success!');
				$state.go('event', { eventId: event._id })

			}, function(err) {
				console.log('event create error');
			})
		}

		function combineDateAndTime(date, time) {
            var dateString = moment(date).format('MM/DD/YYYY');
            return moment(dateString + ' ' + moment(time).format('HH:mm')).format('YYYY-MM-DDTHH:mm:00');
        }
	}

})(angular.module('app'));