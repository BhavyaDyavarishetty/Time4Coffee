var express = require('express');
var router = express.Router();
var persistance = require('./persistance')
global.handle = () => {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time4Coffee' });
});

router.get('/register', async function(req, res, next) {
  clearInterval(handle);
  handle = setInterval(async function() {
    const record = await persistance.find({});
    console.log('posted data', record);
    io.emit('data', record);
  }, 3000);

  res.render('register', { 
    name: '' 
  })
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
