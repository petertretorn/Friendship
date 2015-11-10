var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	title: String,
	about: String,
	location: [Number],
	participants: [String],
	date: Date,
	comments: [{
		author: String,
		text: String,
		datePosted: Date
	}],
	tags: [String]
});


module.exports = mongoose.model('Event', eventSchema);