var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendship');

var profileSchema = new mongoose.Schema({
	id: Number,
	firstName: String,
	lastName: String,
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
	interests: [String],
	description: String,
	lookingfor: String,
	yearOfBirth: Number,
	birthDate: Date
});

//mongoose.model('User', userSchema);

profileSchema.virtual('calculateAge').get(function() {
	return 41;

	var today = new Date(),
		age;

	if (this.birthDate) {
		age = today - this.birthDate;
	} else {
		age = 41;
	}
	return age;
})

module.exports = mongoose.model('Profile', profileSchema);