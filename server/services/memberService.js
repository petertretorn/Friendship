'use strict';

var membersOnline = 0;

exports.membersOnline = function() {
	return membersOnline;
};

exports.incrementMembersOnline = function() {
	membersOnline++;
	return membersOnline;
};

exports.decrementMembersOnline = function() {
	membersOnline--;
};