(function(module) {
	'use strict';

	
	module.factory('mapService', mapService);

	mapService.$inject = ['$q', '$rootScope', 'geolocation'];
	function mapService($q, $rootScope, geolocation) {
		
		function getHtml5Location() {

			return geolocation.getLocation().then(function(data) {

				var LatLng = {lat: data.coords.latitude, lng: data.coords.longitude};
				return LatLng;
			});
		}

		function bootstrapMap(domElement, config, coordinates, shouldListener) {

			google.maps.event.addDomListener(window, 'load', init(domElement, config));

			function init(domElement, config) {
				var mapConfig = {
		                zoom: 15,
		                center: config.coordinates
		            }

				var map = new google.maps.Map(domElement, mapConfig);

				if (config.addListener) {
					addMapListener(map);	
				}

				if (config.addMarker) {
					addMarker(map, config.coordinates);	
				}
			}
		}

		function addMarker(map, coordinates) {
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

					console.log('map clicked!');
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

                	console.log('lat: ' + lat);
                	
                	var coordinates = [ lat, lng ]

	                $rootScope.$broadcast('map-clicked', coordinates);
			});
		}

		


		return {
			bootstrapMap: bootstrapMap,
			getHtml5Location: getHtml5Location,
			addMapListener: addMapListener
		}
	}
})(angular.module('app'));