var express = require('express');
var router = express.Router();
require('../models/users.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get request register route again');
});

router.post('/', function(req, res, next) {

	var name = req.body.firstName || 'no name specified'
	console.log('user registered: ' + name);

	var newUser = new User(req.body);

	newUser.id = 22;

	newUser.save(function(error) {
		if (error) {
			console.log('error saving user');
			return res.status(400).send({
				message: 'mongo error occured...'
			});
		}
		else {
			console.log('success saving user');
			res.json(newUser);
		}
	})
});


module.exports = router;
