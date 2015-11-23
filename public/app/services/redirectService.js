(function(module) {
	'use strict';

	module.factory('redirectService', RedirectService);

	RedirectService.$inject = ['$state'];
	function RedirectService($state) {
		var lastState = 'home';

		return {
			setLastState: setLastState,
			reditctToLastState: reditctToLastState
		}

		function setLastState(state) {
			lastState = state;
			console.log('last state set: ' + lastState);
		}

		function reditctToLastState() {
			$state.go(lastState);
		}
	}

})(angular.module('app'));