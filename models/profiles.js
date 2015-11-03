var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendship');

var profileSchema = new mongoose.Schema({
	id: Number,
	firstName: String,
	lastName: String,
	password: String,
	username: {
		type: String,
		// Set a unique 'username' index
		unique: true,
		// Validate 'username' value existance
		required: 'Username is required',
		// Trim the 'username' field
		trim: true
	},
	gender: String,
	city: String,
	description: String,
	lookingFor: String,
	yearOfBirth: Number,
	birthDate: Date
});

//mongoose.model('User', userSchema);

module.exports = mongoose.model('Profile', profileSchema);