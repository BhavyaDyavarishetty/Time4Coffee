var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time4Coffee' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Time4Coffee2' });
});

module.exports = router;
