var express = require('express');
var router = express.Router();

var Profile = require('../models/profiles.js');

var passport = require('passport');
var User = require('../models/users.js');

router.post('/', function(req, res, next){
	
	console.log('hitting the signup route: ');

	var user = new User(req.body);

	user.save(function(err) {
			// If an error occurs, use flash messages to report the error
			if (err) {
				// Use the error handling method to get the error message
				//var message = getErrorMessage(err);

				// Set the flash messages
				//req.flash('error', message);

				// Redirect the user back to the signup page
				return res.json({ message : 'failure signing up!'})
				//return res.redirect('/signup');
			}

			// If the user was created successfully use the Passport 'login' method to login
			req.login(user, function(err) {
				// If a login error occurs move to the next middleware
				if (err) return next(err);

				// Redirect the user back to the main application page
				//return res.redirect('/');
				return res.json({ message : 'successfully signed up!'})
			});
		});
})

router.post('/api/login', function(req, res, next) {
	passport.authenticate('local', 
	{
		successRedirect: '/',
		failureRedirect: '/#register',
		failureFlash: true
   	});
});

module.exports = router;