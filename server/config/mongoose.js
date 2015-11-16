var mongoose = require('mongoose');

require('../models/events');
require('../models/profiles');
require('../models/users');

module.exports = function(config) {
	mongoose.connect(config.db);
};
