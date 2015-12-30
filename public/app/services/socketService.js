(function(module) {
	'use strict';

	module.service('Socket', Socket);

	Socket.$Inject = ['$timeout', 'identityService'];

	function Socket($timeout, identityService) {

		var that = this;

		that.socket = io();

		that.socket.on('connect', function() {
			console.log('connected socket.io ');
			that.socket.emit('members.count');
		});

		that.on = function(eventName, callback) {
	        that.socket.on(eventName, function(data) {
	            $timeout(function() {
	                callback(data);
	            });
	        });
	    };

	    that.emit = function(eventName, data) {
	        that.socket.emit(eventName, data);
	    };

}
})(angular.module('app'));