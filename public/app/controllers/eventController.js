(function(module) {
	'use strict';

	module.controller('EventController', EventController);

	EventController.$inject = ['$routeParams', 'dataService', 'mapService', 'modalService', 'identityService']
	function EventController($routeParams, dataService, mapService, modalService, identityService) {

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
		}

		vm.joinEvent = function() {
			var user = getUserName();
			console.log('user: ' + user);

			if (vm.event.participants.indexOf(user) === -1) {
				vm.event.participants.push(user);	
				updateEvent(vm.event);
			}
		}

		vm.addComment = function() {
			modalService.textAreaInput("Add new Comment").then(function(text) {

				var comment = {
					author: getUserName(),
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

		vm.upvote = function(comment) {
			


			console.log('authenticated : ' + identityService.isAuthenticated());
			var voter = getUserName()
			console.log(voter + ' : ' + canVote(comment.upVotes, voter))

			if(!!voter && canVote(comment.upVotes, voter)) {
				comment.upVotes.push(voter);
				updateEvent(vm.event);
			}
		}

		vm.downvote = function(comment) {
			var voter = getUserName();

			if(!!voter && canVote(comment.downVotes, voter)) {
				comment.downVotes.push(voter);
				updateEvent(vm.event);
			}	
		}

		function getUserName() {
			if ( identityService.isAuthenticated() ) {
				return identityService.currentUser.username;	
			}
			return undefined;
		}

		function canVote(votes, voter) {
			return votes.indexOf(voter) === -1;
		}

		function updateEvent(event) {
			dataService.updateEvent(event).then(function(updatedEvent) {
				vm.event = updatedEvent;
			}, onError);
		}

		function onError(err) {
				console.log('error : ' + err);
		}

	}
})(angular.module('app'));