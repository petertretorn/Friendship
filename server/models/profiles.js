var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/friendship');

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
	imageUrl: String,
	yearOfBirth: Number,
	birthDate: Date
});

profileSchema.set('toJSON', {
	transform: function(doc, ret, options) {
		delete ret._id;
		delete ret.__v;

		if (ret.birthDate){
			ret.age = calculateAge(ret.birthDate);
		}

		return ret;
	}
});

function calculateAge(birthDate) {
	birthDate = new Date(birthDate);
	var ageDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = mongoose.model('Profile', profileSchema);