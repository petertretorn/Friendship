var passport = require('passport'),
    mongoose = require('mongoose');
    Profile = mongoose.model('Profile'),
    User = mongoose.model('User'),
    encrypt = require('../util/encryption');

exports.authenticate = function(req, res, next) {
  
  console.log('hitting authenticate');

  req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send( {success: false} ) }
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send({ success: true, user: user });
    })
  })
  auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}

exports.registerUser = function(req, res, next) {
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
          return res.json({ username : user.username })
        });
        // -------------------

      res.send(user);
    })
  })
};

exports.logout = function(req, res) {
  req.logout();
  res.end();
}
