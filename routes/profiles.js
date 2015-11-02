var express = require('express');
var router = express.Router();
require('../models/users.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/:id?', function(req, res, next) {

	var id = req.params.id,
		query = { };

	if (id) query._id = id;

	User.find(query, function(error, profiles) {
		if (error) return next(err);
		res.json(profiles);
	});
});

module.exports = router;