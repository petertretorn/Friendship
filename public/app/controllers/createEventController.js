(function(module) {
	'use strict';

	module.controller('CreateEventController', CreateEventController);

	CreateEventController.$inject = ['$rootScope', '$scope', '$location' ,'dataService', 'mapService'];
	function CreateEventController($rootScope, $scope, $location, dataService, mapService) {
		var vm = this,
			map;

		vm.newEvent = {};
		vm.newEvent.time = moment().minute(0).hour(8);

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

		vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	vm.format = vm.formats[0];
	  
	  	vm.status = {
			opened: false
		}

	  	vm.open = function($event) {
	    	vm.status.opened = true;
	  	};

		vm.createEvent = function() {

			vm.newEvent.date = combineDateAndTime(vm.newEvent.date,vm.newEvent.time);
			console.log('time: ' + vm.newEvent.date)
			delete vm.newEvent.time;

			dataService.createEvent(vm.newEvent).then(function(event) {
				vm.newEvent = {};
				toastr.info('Event created succesfully', 'Success!');
				$location.path('/events/' +  event._id);

			}, function(err) {
				console.log('event create error');
			})
			console.log('createEvent');
		}

		function combineDateAndTime(date, time) {
            var dateString = moment(date).format('MM/DD/YYYY');
            return moment(dateString + ' ' + moment(time).format('HH:mm')).format('YYYY-MM-DDTHH:mm:00');
        }
	}

})(angular.module('app'));