var mongoose = require('mongoose'),
	encrypt = require('../util/encryption');

var userSchema = mongoose.Schema({
	username: String,
	hashed_pwd: String,
	salt: String
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.hashed_pwd;
    delete ret.salt;

    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);