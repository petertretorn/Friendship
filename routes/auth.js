var express = require('express');
var router = express.Router();
var Profile = require('../models/profiles.js');
var passport = require('passport');
var User = require('../models/users.js');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var superSecret = 'ilovescotchyscotch';

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
	
	console.log('username : ' + req.body.username);
	console.log('pw : ' + req.body.password);


  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      
      
      console.log('pw : ' + req.body.password);
      if (user.password != req.body.password) {
      //if (!user.authenticate(req.body.password)) {
      //if ( false ) {
      //if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, superSecret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
    	  username : user.username,
    	  id: user._id,
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

var checkuser = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}

router.get('/isauthenticated', function(req, res, next) {
	console.log('hitting the isauthenticated route: ');

	if (!req.isAuthenticated()) {
		return res.json({ isauthenticated: false } );
	}
	else {
		return res.json({ isauthenticated: true } );
	}
});

router.get('signout', function(req, res, next) {
	// Use the Passport 'logout' method to logout
	req.logout();

	// Redirect the user back to the main application page
	res.redirect('/');
});

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

router.post('/login', function(req, res, next) {
	
	console.log('before passport authenticate')
	var result = passport.authenticate('local', 
	{
		successRedirect: '/',
		failureRedirect: '/#register',
		failureFlash: true
   	});
   	console.log('after passport authenticate: ' + req.isAuthenticated());
});


function createNewProfile(user) {
	console.log('before');

	var profile = new Profile({ username: user.username });

	console.log('after');

	profile.save(function(err){

		if (err) return res.json({ message : 'failure setting up new profile!'})

		return res.json({ username : user.username })
	})

}

module.exports.router = router;
module.exports.checkuser = checkuser;