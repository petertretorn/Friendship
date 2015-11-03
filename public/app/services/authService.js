(function(module) {
	
	'use strict';

	module.factory('authService', authService);

	authService.$inject = ['$http'];
	function authService($http) {
		
		function signUp(signupModel) {

			return $http.post('http://localhost:3000/signup', signupModel).then(onSuccess, onFailure);

			function onSuccess(repsonse) {
				console.log('signed up succesfully!!');
			}

			function onFailure(repsonse) {
				console.log('boo... failure!!');
			}
		}

		return {
			signUp: signUp
		};
	}


})(angular.module('app'));