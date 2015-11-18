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

			var userName = getUserName();
			
			vm.event = event;

			vm.hasJoined = ( event.participants.indexOf( userName ) !== -1 );

			console.log('joined: ' + vm.hasJoined);

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

			if (!!user && vm.event.participants.indexOf(user) === -1) {
				vm.event.participants.push(user);

				var callback = function() { vm.hasJoined = true; }
				updateEvent(vm.event, callback);
			}
		}

		vm.addComment = function() {
			var user = getUserName();

			if (!user) {
				return;
			}

			modalService.textAreaInput("Add new Comment").then(function(text) {

				var comment = {
					author: user,
					text: text,
					datePosted: new Date(),
					upVotes: [],
					downVotes : []
				}

				vm.event.comments.push(comment)

				dataService.updateEvent(vm.event).then(function(event) {
					vm.event = event;
				}, onError());  // updateEvent


			}, onError()); // textAreaInput
		}// addComment

		vm.upvote = function(comment) {
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

		vm.isAuthenticated = function() {
			return identityService.isAuthenticated();
		}

		function canVote(votes, voter) {
			return votes.indexOf(voter) === -1;
		}

		function updateEvent(event, callback) {
			dataService.updateEvent(event)
				.then(function(updatedEvent) {
					vm.event = updatedEvent;
				}, onError)
				.then(function() {
					if (!!callback) callback();
					else return;
				}, onError);
		}

		function onError(err) {
				console.log('error : ' + err);
		}

	}
})(angular.module('app'));