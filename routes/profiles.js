var express = require('express');
var router = express.Router();

var Profile = require('../models/profiles.js');

router.get('/:id?', function(req, res, next) {

	var id = req.params.id,
		query = { };

	if (id) query._id = id;

	Profile.find(query, function(error, profiles) {
		if (error) return next(err);
		res.json(profiles);
	});
});

function middleware(req, res, next){
	console.log('inside middleware!!!');

	next();
}

module.exports = router;