var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('nuevo', { title: 'JobScope' });
});

router.get('/userlogin', function(req, res, next) {
	res.render('usuariologin');
});

router.get('/home', function(req, res, next){
	res.render('home');
});

router.get('/drop', function(req, res, next){
	res.render('drop');
});

module.exports = router;
