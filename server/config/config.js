var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/friendship',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://peterlarsen:flamenco@ds047524.mongolab.com:47524/friendship',
    port: process.env.PORT || 80
  }
}