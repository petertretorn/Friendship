(function(module) {

	'use strict';

	module.factory('localStorage', LocalStorage)

	LocalStorage.$inject = ['$window'];
	function LocalStorage($window) {
		var store = $window.localStorage;

		return {
			add: add,
			get: get,
			remove: remove
		}

		function add(key, value) {
			value = angular.toJson(value);
			store.setItem(key, value);
		}

		function get(key) {
			var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
		}

		function remove(key) {
			store.removeItem(key);
		}
	}

})(angular.module('app'));