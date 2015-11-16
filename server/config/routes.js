var routes = require('../routes/index');
var users = require('../routes/users');
var register = require('../routes/register');
var profiles = require('../routes/profiles');
var events = require('../routes/events');
var auth = require('../routes/auth');
var register = require('../routes/register');

module.exports = function(app) {
  app.use('/', routes);
  app.use('/api/register', register);
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/profiles', profiles);
  app.use('/api/events', events);
  app.use('/api/register', register);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}
