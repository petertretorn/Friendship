var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	title: String,
	about: String,
	location: String,
	latlong: [Number],
	participants: [String],
	date: Date,
	comments: [{
		author: String,
		text: String,
		datePosted: Date,
		upVotes: [String],
		downVotes: [String]
	}],
	tags: [String],
	createdBy: String
});


module.exports = mongoose.model('Event', eventSchema);