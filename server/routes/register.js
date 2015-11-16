var express = require('express'),
	router = express.Router();

	mongoose = require('mongoose');
	Profile = mongoose.model('Profile'),
	User = mongoose.model('User'),
	encrypt = require('../util/encryption');



var registerUser = function(req, res, next) {

	console.log('new registered');

	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
	User.create(userData, function(err, user) {
		if(err) {
		  if(err.toString().indexOf('E11000') > -1) {
		    err = new Error('Duplicate Username');
		  }
		  res.status(400);
		  return res.send({reason:err.toString()});
		}
		req.logIn(user, function(err) {
		  if(err) { return next(err); }
		  
		  // -------------------
		  console.log('before');
		    var profile = new Profile({ username: user.username });
		    console.log('after');

		    profile.save(function(err){
		      if (err) return res.json({ message : 'failure setting up new profile!'})
		      
		      res.send(user);
		      //return res.json({ username : user.username })
		    });
		    // -------------------

		  //res.send(user);
		})
	})
};

router.post('/', registerUser);


function old(req, res, next) {

	var name = req.body.firstName || 'no name specified'
	console.log('user registered: ' + name);

	var newUser = new Profile(req.body);

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
}


module.exports = router;
