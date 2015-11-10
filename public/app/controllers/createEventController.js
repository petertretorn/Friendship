(function(module) {
	'use strict';

	module.controller('CreateEventController', CreateEventController);

	CreateEventController.$inject = ['$rootScope', '$scope', 'geolocation', 'dataService'];
	function CreateEventController($rootScope, $scope, geolocation, dataService) {
		var vm = this,
			map;

		vm.newEvent = {};
		vm.locatationSelected = false;

		init();

		function init() {
			
			var coords,
				longitude,
				latitude;

			geolocation.getLocation().then(function(data) {

				var LatLng = {lat: data.coords.latitude, lng: data.coords.longitude};

				var testLatLng = {lat: 39.500, lng: -98.350};

				var map = new google.maps.Map(document.getElementById('googleMap'),
					{
	                    zoom: 15,
	                    center: testLatLng
	                });
	    		
				addMapListener(map);
			});	
		}

		$rootScope.$on('map-clicked', function() {
			$scope.$apply(function() {
				vm.locatationSelected = true;	
			})
		});

		function addMapListener(map) {
			
			var lastMarker;

			google.maps.event.addListener(map, 'click', function(e){
	          		var lat,
	          			lng;

	                var marker = new google.maps.Marker({
	                    position: e.latLng,
	                    animation: google.maps.Animation.BOUNCE,
	                    map: map,
	                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
	                });
	                
	                // When a new spot is selected, delete the old red bouncing marker
	                if(lastMarker){
	                    lastMarker.setMap(null);
	                }

	                // Create a new red bouncing marker and move to it
	                lastMarker = marker;
	                map.panTo(marker.position);

	                lat = marker.getPosition().lat();
                	lng = marker.getPosition().lng();

                	vm.newEvent.latlong = [ lat, lng ]

	                $rootScope.$emit('map-clicked');
			});
		}

		google.maps.event.addDomListener(window, 'load', init());

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