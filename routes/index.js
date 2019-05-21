const express = require('express');
const router = express.Router();


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

router.post('/register', function(req, res, next) {
  console.log('posted data', req, res, next);


  res.render('index', { title: 'Time4Coffee' })

});

router.post('/post-weights', function(req, res, next) {

});

module.exports = router;
