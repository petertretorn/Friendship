var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/mongoose')(config);

app = require('./server/config/express')(app, config);

require('./server/config/passport')();

//require('./server/config/routes')(app);
/*
app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
*/
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');


