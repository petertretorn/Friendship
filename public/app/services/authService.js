(function(module) {
	
	'use strict';

	module.factory('authService', authService);

	authService.$inject = ['$http', '$rootScope', '$q', '$location', 'dataService', 'identityService', 'settings'];
	function authService($http, $rootScope, $q, $location, dataService, identityService, settings) {
		
		return {
			register : register,
			login : login,
			signout : signout
		};

		var baseUrl = settings.baseUrl;

		function register(signupModel) {

			return $http.post(baseUrl + 'register', signupModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				var deferred = $q.defer();

				var loggedInUser;
				angular.extend(loggedInUser, response.data.user);
				identityService.currentUser = loggedInUser;

				$rootScope.$broadcast('signedin');
			}

			function onFailure(response) {
				console.log('boo... failure!!');
			}	
		}

		function login(loginModel) {
			var deferred = $q.defer();

			$http.post(baseUrl + 'auth/login', loginModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				if (!response.data.success) {
					console.log('authentication failure!');
					deferred.reject('authentication failure');
				} else {
					identityService.currentUser = response.data.user;

					console.log('user : ' + identityService.currentUser.username);

					$rootScope.$broadcast('signedin');

					deferred.resolve('authentication success!');
				}
			}

			function onFailure(response) {
				console.log('boo... login failure!!');
				deferred.reject('server failure');
			}

			return deferred.promise;
		}

		function signout() {
			identityService.currentUser = undefined;
			$location.path('/');
		}
	}

})(angular.module('app'));