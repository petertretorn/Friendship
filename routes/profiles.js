var express = require('express');
var router = express.Router();
require('../models/users.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {

	User.find({}, function(error, profiles) {
		if (error) return next(err);
		res.json(profiles);
	});
});

module.exports = router;