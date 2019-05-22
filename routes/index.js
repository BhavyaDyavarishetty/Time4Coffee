var express = require('express');
var router = express.Router();
var persistance = require('./persistance')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time4Coffee' });
});

router.get('/register', async function(req, res, next) {
  // res.render('register', { title: 'Register Pot' });
  // let time = 0

  setInterval(async function() {
    console.log('every 2 secs');
    // console.log('posted data', io);
    const record = await persistance.find({});
    console.log('posted data', record);
    io.emit('data', record);
  }, 3000);

  // if not fetched from db
  res.render('register', { 
    name: '' 
  })


  // // if fetched from db but without empty weight
  // res.render('register', { name: 'Time4Coffee', emptyWeight: false })
  // update mongo with empty weight

  // if fetched from db but without capacity weight
  // res.render('register', { name: 'Time4Coffee', emptyWeight: 'Testing', capacityWeight: false })

  // if fetched from db with all info
  // res.render('index', { title: 'Time4Coffee' })
});

router.post('/register', async function(req, res) {
  console.log("post register", req['body']);
  const record = await persistance.insert(req['body']);
  res.send('Pot is registered');
});

router.post('/update', async function(req, res) {
  const data = req['body'];
  const { id, weight } = data;
  const record = await persistance.find({ pot_id: id });
  const { empty_pot_weight, pot_capacity } = record;

  let params;
  if (empty_pot_weight === 0 && weight >= 100 ) {
    params = { empty_pot_weight: weight }
  } else if (pot_capacity === 0) {
    params = { pot_capacity: weight }
  } else if (weight < pot_capacity) {
    params = { current_weight: weight }
  }

  await persistance.update(id, params);
  res.send('Pot is updated');
});

module.exports = router;
