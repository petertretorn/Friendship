var express = require('express');
var router = express.Router();

var Event = require('../models/events.js');

router.post('/', function(req, res, next) {
	console.log('creating event...');

	var event = new Event(req.body);

	event.save(function(err) {
		if (err) {
			return res.status(400).send({ message: 'error saving event: ' + err});
		}
		return res.json(event);
	})
});

module.exports = router;