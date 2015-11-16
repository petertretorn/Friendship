(function() {

	'use strict';

	var app = angular.module('app', ['ngRoute', 'ngMessages', 'ui.bootstrap', 'geolocation']);

	app.config(function($routeProvider) {
		$routeProvider
		  .when('/', {
		  	templateUrl: '/app/views/list.html',
		  	controller: 'ListController',
		  	controllerAs: 'vm'
		  })
		  .when('/register', {
		  	templateUrl: '/app/views/register.html',
		  	controller: 'RegisterController',
		  	controllerAs: 'vm'
		  })
		  .when('/user/profile', {
		  	templateUrl: '/app/views/editProfile.html',
		  	controller: 'EditProfileController',
		  	controllerAs: 'vm',
		  })
		  .when('/edit/:id?', {
		  	templateUrl: '/app/views/edit.html',
		  	controller: 'EditController',
		  	controllerAs: 'vm',
		  })
		  .when('/login', {
		  	templateUrl: '/app/views/login.html',
		  	controller: 'LoginController',
		  	controllerAs: 'vm',
		  })
		  .when('/signup', {
		  	templateUrl: '/app/views/signup.html',
		  	controller: 'SignupController',
		  	controllerAs: 'vm',
		  })
		  .when('/create-event', {
		  	templateUrl: '/app/views/createEvent.html',
		  	controller: 'CreateEventController',
		  	controllerAs: 'vm',
		  })
		  .when('/events/:eventId', {
		  	templateUrl: '/app/views/event.html',
		  	controller: 'EventController',
		  	controllerAs: 'vm',
		  })
		  .otherwise({
		  	redirectTo: '/'
		  });
	});


	app.constant('settings', {
		baseUrl: 'http://localhost:3030/api/'
	});
/*
	app.run(["$rootScope", "$location", function($rootScope, $location) {
	
		$rootScope.$on("$routeChangeSuccess", function(userInfo) {
			console.log(userInfo);
		});

		$rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
			if (eventObj.authenticated === false) {
			  $location.path("/login");
			}
		});
	
	}]);
*/
})();