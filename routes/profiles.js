var express = require('express');
var router = express.Router();

var Profile = require('../models/profiles.js');

router.get('/:username?', function(req, res, next) {

	var id = req.params.id,
		query = { };

	if (id) query.username = username;

	Profile.find(query, function(error, profiles) {
		if (error) return next(err);
		res.json(profiles);
	});
});

module.exports = router;