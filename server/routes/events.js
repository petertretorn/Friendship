var express = require('express');
var router = express.Router();
var _ = require('lodash');
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

router.get('/:id', function(req, res, next) {
	
	var id = req.params.id;

	Event.findById(id, function(err, event) {
		if (err) {
			
			return res.status(400).send({ message: 'error fetching event: ' + err});
		}
		return res.json(event);
	})
});

router.get('/', function(req, res, next) {
	Event.find({}, function(err, events) {
		if (err) {
			return res.status(400).send({ message: 'error fetching events: ' + err});
		}
		return res.json(events);
	})
});

router.put('/:id', function(req, res, next) {

	var id = req.params.id,
		updatedEvent = req.body;

	Event.findById(id, function(err, event) {
		if (err) {
			return res.status(400).send({ message: 'error fetching event: ' + err});
		}
		event = _.extend(event, updatedEvent);

		event.save(event, function(err) {
			if (err) {
				return res.status(400).send({ message: 'error updating event: %s', err});
			}
			return res.json(event);
		})
	})
})

module.exports = router;