var express = require('express'),
	router = express.Router();
	mongoose = require('mongoose');
	Profile = mongoose.model('Profile'),
	User = mongoose.model('User'),
	encrypt = require('../util/encryption');

var registerUser = function(req, res, next) {

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
		  
		    var profile = new Profile({ username: user.username });
		    profile.messages.push( _createWelcomeMessage() );

		    profile.save(function(err){
		      if (err) return res.json({ status: false, message : 'failure setting up new profile!'})
		      res.send(profile);
		    });
		});
	})
};

router.post('/', registerUser);

function _createWelcomeMessage() {
	return {
		from: 'admin',
		content: 'Welcome on board and thank you for signing up with the FriendShip. Hope you enjoy your trip!',
		timeSent: new Date(),
		hasBeenRead: false
  	}
}

module.exports = router;
