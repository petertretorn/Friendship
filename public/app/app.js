(function() {

	'use strict';

	var app = angular.module('app', ['ngMessages', 'ngFileUpload', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'ui.calendar', 'geolocation']);

	app.config(Config);

	Config.$Inject = ['$stateProvider', '$urlRouterProvider'];
	function Config ($stateProvider, $urlRouterProvider) {

		var routeRoleChecks = {
		    admin: { auth: function(authService) {
		    	//TODO
      			//return authService.authorizeCurrentUserForRoute('admin')
    		}},
    		user: {auth: function(authService) {
      			return authService.authorizeForRoute();
    		}}
  		}

		$stateProvider
		  .state('home', {
		  	url: '/',
		  	templateUrl: '/app/views/list.html',
		  	controller: 'ListController',
		  	controllerAs: 'vm'
		  })
		  .state('online', {
		  	url: '/online',
		  	templateUrl: '/app/views/list.html',
		  	controller: 'OnlineController',
		  	controllerAs: 'vm'
		  })
		  .state('register', {
		  	url: '/register',
		  	templateUrl: '/app/views/register.html',
		  	controller: 'RegisterController',
		  	controllerAs: 'vm'
		  })
		  .state('edit', {
		  	url: '/user/edit-profile',
		  	templateUrl: '/app/views/editProfile.html',
		  	controller: 'EditProfileController',
		  	controllerAs: 'vm',
		  	resolve: routeRoleChecks.user
		  })
		  .state('profile', {
		  	url: '/profile/:username', 
		  	templateUrl: '/app/views/profile.html',
		  	controller: 'ProfileController',
		  	controllerAs: 'vm',
		  })
		  .state('messages', {
		  	url: '/profile/:username/messages', 
		  	templateUrl: '/app/views/messagesReceived.html',
		  	controller: 'MessagesController',
		  	controllerAs: 'vm',
		  })
		  .state('login', {
		  	url: '/login',
		  	templateUrl: '/app/views/login.html',
		  	controller: 'LoginController',
		  	controllerAs: 'vm',
		  })
		  .state('signup', {
		  	url: '/signup',
		  	templateUrl: '/app/views/signup.html',
		  	controller: 'SignupController',
		  	controllerAs: 'vm',
		  })
		  .state('create-event', {
		  	url: '/create-event',
		  	templateUrl: '/app/views/createEvent.html',
		  	controller: 'CreateEventController',
		  	controllerAs: 'vm',
		  	resolve: routeRoleChecks.user
		  })
		  .state('event', {
		  	url: '/events/:eventId',
		  	templateUrl: '/app/views/event.html',
		  	controller: 'EventController',
		  	controllerAs: 'vm'
		  })
		  .state('all-events', {
		  	url: '/all-events',
		  	abstract: true,
		  	templateUrl: '/app/views/allEvents.html',
		  	controller: 'EventListController',
		  	controllerAs: 'vm'
		  })
		  	.state('all-events.calender', {
		  		url: '/calender',
			  	templateUrl: '/app/views/calender.html',
			  	controller: 'CalenderController',
			  	controllerAs: 'calenderVm',
			  	resolve: {
			  		events: ['dataService', function(dataService) {
			  			return dataService.getEvents();
			  		}]
			  	}
		  	})
		  	.state('all-events.list', {
		  		url: '/list',
			  	templateUrl: '/app/views/eventsList.html'
		  	});
		  

	    $urlRouterProvider.otherwise('/');
	};

	app.constant('settings', {
		development : {
			baseUrl: 'http://localhost:3030/api/'
		},
		production : {
			baseUrl: 'http://thefriendship.herokuapp.com/api'
		},
	});

	app.run(runner);

	runner.$Inject = ['$rootScope', '$state', '$window', 'redirectService', 'authService', 'identityService'];
	function runner($rootScope, $state, $window, redirectService, authService, identityService) {
		toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';

        window.onbeforeunload = function(event) {
        	authService.signout();
        	if (identityService.currentUser.signedIn === true) {
        		return "Sure you want to leave?";
        	}
        }

        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error)  {
			if (error === 'not authorized') {
		  		toastr.info('Login to create event!');
		  		redirectService.setLastState(toState);
		  		$state.go('login');
			}
		});	
	};
})();