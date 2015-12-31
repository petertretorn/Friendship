(function(module) {
	'use strict';

	module.service('identityService', IdentityService);

	IdentityService.$inject = ['localStorage'];
	
	function IdentityService(localStorage) {
		var USER_KEY = 'currentUser';

		var _currentUser = {
			signedIn: false
		}

		_init()

		function _init() {
			var savedUser = localStorage.get( USER_KEY );

			if (savedUser) {
				_currentUser.signedIn = true;
				_currentUser.username = savedUser.username;
				_currentUser.profile = savedUser.profile;
			}
		}

		this.setCurrentUser = function(user) {
			_currentUser.username = user.username			
			_currentUser.signedIn = true;
			_currentUser.profile = user;

			console.log('length : ' + _currentUser.profile.messages.length);

			localStorage.add(USER_KEY, _currentUser);
		}

		this.clearCurrentUser = function() {
			localStorage.remove(USER_KEY);
			_currentUser =  {
				signedIn: false
			}
		}

		this.isAuthenticated = function() {
			return _currentUser.signedIn;
		}

		this.getCurrentUser = function() {
			return _currentUser;
		}
	}

})(angular.module('app'))