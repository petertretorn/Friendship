var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ title: 'Express'
	  //user: JSON.stringify(req.user)
	});
});
/*
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
*/
module.exports = router;
