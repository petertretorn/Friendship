var express = require('express');
var router = express.Router();
var uploader = require('../controllers/uploadController');
var _ = require('lodash');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var Profile = require('../models/profiles.js');
var memberService = require('../services/memberService.js');

router.get('/', function(req, res, next) {
	Profile.find({}, function(error, profiles) {
		if (error) return next(err);
		res.json(profiles);
	});
});

router.get('/online', function(req, res, next) {

	var onlineMembers = memberService.getOnlineMembers();
	
	var usernames = _.map(onlineMembers, function(member) {
		return member.username;
	});

	var queryObj = {
		username : { $in: usernames }
	};

	Profile.find(queryObj, function(error, profiles) {
		if (error) return next(err);
		res.json(profiles);
	});
});

router.get('/:username', function(req, res, next) {
	var username = req.params.username;
		
	Profile.findOne( { username: username }, function(error, profile) {
		if (error) return next(err);
		res.json(profile);
	});
});

router.put('/:username', function(req, res, next) {
	var updatedProfile = req.body;
	var username = req.params.username;

	Profile.findOne({ username: username }, function(err, profile) {
		if (err) return res.json({ message : 'error fetching profile'});
		profile = _.extend(profile, updatedProfile);

		profile.save(function(err) {
			if (err) {
				return res.status(400).send({message: 'mongo error occured...' + err});
			}
			return res.json(profile);
	 	});
	})
});

router.post('/:username/messages', function(req,res, next) {
	var username = req.params.username;
	var message = req.body;

	message.hasBeenRead = false;
	message.timeSent = new Date();

	Profile.findOne({ username: username }, function(err, profile) {
		if (err) return res.json({ message : 'error fetching profile'});

		profile.messages.push(message);

		profile.save(function(err) {
			var returnObj = {};

			if (err) returnObj.success = false;
			else {
				message =  _.findWhere(profile.messages, message);
				_notifyMessageReceived(username, message);
				returnObj.success = true;
			}

			return res.json(returnObj);
	 	});
	});
});

function _notifyMessageReceived(username, message) {
	var socket = memberService.getSocketForUser(username);
	if (socket) {
		socket.emit('message.received', message);
	}
}

router.put('/:username/messages/:messageId', function(req, res, next) {
	var username = req.params.username,
		messageId = req.params.messageId,
		message = req.body;

	Profile.findOne({ username: username }, function(err, profile) {
		if (err) return res.json({ message : 'error fetching profile'});

		var messageToUpdate = _.filter(profile.messages, function(currentMessage) {
			return (currentMessage._id == message._id);
		})[0];

		messageToUpdate.hasBeenRead = true;

		profile.save(function(err) {
			var returnObj = {};

			if (err) returnObj.success = false;
			else {
				returnObj.success = true;
				returnObj.message = messageToUpdate;
			}

			return res.json(returnObj);
	 	});
	});
});

router.delete('/:username/messages/:messageId', function(req, res, next) {
	var username = req.params.username,
		messageId = req.params.messageId;

	Profile.findOne({ username: username }, function(err, profile) {
		if (err) return res.json({ message : 'error fetching profile'});

		profile.messages.pull( { _id: messageId } );

		profile.save(function(err) {
			var returnObj = {};

			if (err) returnObj.success = false;
			else {
				returnObj.success = true;
			}

			return res.json(returnObj);
	 	});
	});
});

router.post('/photo', multipartyMiddleware, uploader.uploadImage);

module.exports = router;