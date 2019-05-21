
var express = require('express');
var router = express.Router();
var persistance = require('./persistance')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time4Coffee' });
});

router.get('/register', function(req, res, next) {
  // res.render('register', { title: 'Register Pot' });
  // let time = 0

  // console.log('posted data', req, res, next);

  // if not fetched from db
  res.render('register', { 
    name: '', 
    inputEnter: function() {
      console.log("update mongo");
    } 
  })

  // // if fetched from db but without empty weight
  // res.render('register', { name: 'Time4Coffee', emptyWeight: false })
  // update mongo with empty weight

  // if fetched from db but without capacity weight
  // res.render('register', { name: 'Time4Coffee', emptyWeight: 'Testing', capacityWeight: false })

  // if fetched from db with all info
  // res.render('index', { title: 'Time4Coffee' })
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
