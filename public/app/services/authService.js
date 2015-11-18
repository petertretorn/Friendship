(function(module) {
	
	'use strict';

	module.factory('authService', authService);

	authService.$inject = ['$http', '$rootScope', '$q', '$location', 'dataService', 'identityService'];
	function authService($http, $rootScope, $q, $location, dataService, identityService) {
		
		return {
			register : register,
			login : login,
			signout : signout
		};

		function register(signupModel) {

			return $http.post('/api/register', signupModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				identityService.currentUser = response.data;
				$rootScope.$broadcast('signedin');
			}

			function onFailure(response) {
				console.log('boo... failure!!');
			}	
		}

		function login(loginModel) {
			var deferred = $q.defer();

			$http.post('/api/auth/login', loginModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				if (!response.data.success) {
					console.log('authentication failure!');
					deferred.reject('authentication failure');
				} else {
					identityService.currentUser = response.data.user;

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