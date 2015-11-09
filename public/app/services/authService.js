(function(module) {
	
	'use strict';

	module.factory('authService', authService);

	authService.$inject = ['$http', '$rootScope', '$q', '$location', 'dataService'];
	function authService($http, $rootScope, $q, $location, dataService) {
		
		var currentUser = { signedIn : false };

		var baseUrl = 'http://localhost:3000/auth/';

		init();

		function init() {
			currentUser = { signedIn : false };
		}

		function signUp(signupModel) {



			return $http.post(baseUrl + 'authenticate', signupModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				var deferred = $q.defer();

				console.log('signed up succesfully : ' + response.data.username);
				console.log('signed up succesfully : ' + response.data.token);
				
				currentUser.signedIn = true;
				
				var username = response.data.username;
				
				currentUser.username = username;

				$rootScope.$broadcast('signedin');
			}

			function onFailure(response) {
				console.log('boo... failure!!');
			}	
		}

		function login(loginModel) {
			var deferred = $q.defer();

			$http.post(baseUrl + 'authenticate', loginModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				console.log('username : ' + response.data.username);
				console.log('token : ' + response.data.token);

				if (!response.data.token) {
					console.log('authentication failure!');
					deferred.reject('authentication failure');
				} else {
					currentUser.signedIn = true;
					currentUser.token = response.data.token;
					var username = response.data.username;
					
					currentUser.username = username;

					$rootScope.$broadcast('signedin');

					deferred.resolve('authentication failure');
				}
			}

			function onFailure(response) {
				console.log('boo... login failure!!');
				deferred.reject('server failure');
			}

			return deferred.promise;
		}

		function signout() {
			currentUser.signedIn = false;
			$location.path('/');
		}

		return {
			signUp : signUp,
			login : login,
			signout : signout,
			currentUser : currentUser
		};
	}


})(angular.module('app'));