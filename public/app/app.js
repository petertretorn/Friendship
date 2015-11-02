(function() {

	'use strict';

	var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

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
		  .when('/detail', {
		  	templateUrl: '/app/views/detail.html'
		  })
		  .otherwise({
		  	redirectTo: '/'
		  });
	});

	


})();