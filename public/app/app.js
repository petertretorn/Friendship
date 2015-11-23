(function() {

	'use strict';

	var app = angular.module('app', ['ngMessages', 'ngFileUpload', 'ui.bootstrap', 'ui.router', 'ui.calendar', 'geolocation']);

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
		  })
		  .state('profile', {
		  	url: '/profile/:username', 
		  	templateUrl: '/app/views/profile.html',
		  	controller: 'ProfileController',
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
		  	url: '/all-events/',
		  	templateUrl: '/app/views/eventList.html',
		  	controller: 'EventListController',
		  	controllerAs: 'vm'
		  })
		  .state('calender', {
		  	url: '/calender/',
		  	templateUrl: '/app/views/calender.html',
		  	controller: 'CalenderController',
		  	controllerAs: 'vm',
		  	resolve: {
		  		events : ['dataService', function(dataService) {
		  			return dataService.getEvents();
		  		}]
		  	} 
		  })

	    $urlRouterProvider.otherwise('/');
	};


	app.constant('settings', {
		development : {
			baseUrl: 'http://localhost:3030/api/'
		},
		production : {
			baseUrl: 'http://thefriendship.herokuapp.com/api'
		}
	});

	app.run(Run);

	Run.$Inject = ['$rootScope', '$state', 'redirectService'];
	function Run($rootScope, $state, redirectService) {
		toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';

        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error)  {
			console.log('error: ' + error);
			if (error === 'not authorized') {
		  		toastr.info('Login to create event!');
		  		redirectService.setLastState(toState);
		  		$state.go('login');
			}
		});	
	};
})();