(function(module) {
	'use strict';

	module.controller('CreateEventController', CreateEventController);

	CreateEventController.$inject = ['$rootScope', '$scope', 'dataService', 'mapService'];
	function CreateEventController($rootScope, $scope, dataService, mapService) {
		var vm = this,
			map;

		vm.newEvent = {};
		vm.locatationSelected = false;

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

			$scope.$apply(function() {
				vm.locatationSelected = true;	
			})
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
			dataService.createEvent(vm.newEvent).then(function(data) {
				console.log('event created!!'); 
			}, function(err) {
				console.log('event create error');
			})
			console.log('createEvent');
		}
	}

})(angular.module('app'));