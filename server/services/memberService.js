'use strict';

var _ = require('lodash');

var membersOnline = [];

exports.membersOnlineCount = function() {
	return membersOnline.length;
};

exports.addOnlineMemeber = function(username) {
	membersOnline.push(username);
}

exports.removeOnlineMember = function(username) {
	_.remove(membersOnline, function(member) {
		return username === member.username;
	});
}

exports.getOnlineMembers = function() {
	return membersOnline;
}

exports.getSocketForUser = function (username) {
	var socket = undefined,
		member = _.findWhere(membersOnline, { username : username } );

	if (member) {
		socket = member.socket;
	}

	return socket;
}