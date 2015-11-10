(function(module) {
	'use strict';


	module.factory('mapService', mapService);

	function mapService() {
		
		function bootstrapMap(element, coordinates) {
			//google.maps.event.addDomListener(window, 'load', init(element, coordinates));

			init(element, coordinates);
		}

		function init(element, coordinates) {
			//var LatLng = {lat: coordinates.latitude, lng: coordinates.longitude};
			//var coordinates = { lat: vm.event.location[0], lng: vm.event.location[1]}
			console.log('latitude: ' + coordinates.lat);
			console.log('longitude: ' + coordinates.lng);

			var mapConfig = {
	                zoom: 15,
	                center: coordinates
	            }

			var map = new google.maps.Map(element, mapConfig);

			//var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: coordinates,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
		}

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

		


		return {
			bootstrapMap: bootstrapMap
		}
	}
})(angular.module('app'));