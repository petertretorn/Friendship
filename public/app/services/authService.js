(function(module) {
	
	'use strict';

	module.factory('authService', authService);

	authService.$inject = ['$http', '$rootScope', '$q', '$location', 'dataService', 'identityService', 'Socket'];
	function authService($http, $rootScope, $q, $location, dataService, identityService, Socket) {
		
		return {
			register : register,
			login : login,
			signout : signout,
			authorizeForRoute: authorizeForRoute
		};

		function register(signupModel) {

			return $http.post('/api/register', signupModel).then(onSuccess, onFailure);

			function onSuccess(response) {
				identityService.setCurrentUser(response.data);
				console.log('auth : ' + identityService.getCurrentUser().username);
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
					deferred.reject('authentication failure');
				} else {
					var user = response.data.user;
					identityService.setCurrentUser(user);

					$rootScope.$broadcast('signedin');

					Socket.emit('member.login', { username: loginModel.username });

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
			$location.path('/');
			if (identityService.getCurrentUser().signedIn === true) {
				
				var username = identityService.getCurrentUser().username;
				Socket.emit('member.logout', { username : username } );
				identityService.clearCurrentUser();	
			}
		}

		function authorizeForRoute() {
     		if(identityService.isAuthenticated()) {
        		return true;
      		} else {
    			return $q.reject('not authorized');
      		}
    	}
	}

})(angular.module('app'));