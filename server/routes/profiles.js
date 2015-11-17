var express = require('express');
var router = express.Router();
var uploader = require('../controllers/uploadController');
var _ = require('lodash');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var Profile = require('../models/profiles.js');

router.get('/:username?', function(req, res, next) {

	var username = req.params.username,
		query = { };

	if (username) query.username = username;

	Profile.find(query, function(error, profiles) {
		if (error) return next(err);
		
		res.json(profiles);
	});
});

router.put('/:username', function(req, res, next) {

	console.log('hitting route!');

	var updatedProfile = req.body;

	var username = req.params.username;

	console.log('username: %s', username);

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

router.post('/photo', multipartyMiddleware, uploader.uploadImage);

module.exports = router;