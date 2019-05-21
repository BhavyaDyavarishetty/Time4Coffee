var express = require('express');
var router = express.Router();
var persistance = require('./persistance')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time4Coffee' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Time4Coffee2' });
});

router.post('/register', function(req, res) {
  persistance.insertDocuments(req['body'], function () {
    res.send('Pot is registered')
  });
});

router.post('/update', function(req, res) {
  persistance.updateDocument(req['body'], function () {
    res.send('Pot is updated')
  });
});


module.exports = router;
