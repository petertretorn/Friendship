var express = require('express');
var router = express.Router();
var Profile = require('../models/profiles.js');
var passport = require('passport');
var User = require('../models/users.js');

var auth = require('../controllers/authServerController');



router.post('/login', auth.authenticate);

router.post('/logout', auth.logout);






/*

router.post('/signup', function(req, res, next){
	
	console.log('hitting the signup route: ');

	var user = new User(req.body);

	user.save(function(err) {
			// If an error occurs, use flash messages to report the error
			if (err) {


				// Redirect the user back to the signup page
				return res.json({ message : 'failure signing up!'});
				//return res.redirect('/signup');
			}

			// If the user was created successfully use the Passport 'login' method to login
			req.login(user, function(err) {
				// If a login error occurs move to the next middleware
				if (err) return next(err);

				//create a new profile in db
				console.log('before');
				var profile = new Profile({ username: user.username });
				console.log('after');

				profile.save(function(err){
					if (err) return res.json({ message : 'failure setting up new profile!'})
					return res.json({ username : user.username })
				});
			});
		});
})

*/
module.exports = router;
