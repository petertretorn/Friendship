var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {

  var server = require('../controllers/socket.io.controller.js').server(app);

  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({secret: 'multi vision unicorns'}));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(express.static(config.rootPath + '/public'));

  require('./routes')(app);

  app.use(bodyParser.json());

// parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true })); 

  
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });

  return server;
}