var express = require('express');
var router = express.Router();
var persistance = require('./persistance')
global.handle = () => {};
let pot_id;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time4Coffee' });
});

router.get('/register', async function(req, res, next) {
  clearInterval(handle);
  pot_id = 0;
  
  handle = setInterval(async function() {
    const record = await persistance.find({ "pot_id": pot_id });
    // console.log('posted data', record);
    io.emit('data', record);
  }, 3000);

  res.render('register', { 
    name: '' 
  })
});

router.post('/register', async function(req, res) {
  console.log("post register", req['body']);
  pot_id = req['body'].pot_id;
  const record = await persistance.find({ "pot_id": pot_id });
  if(record) {
    await persistance.update(pot_id, req['body']);
  } else {
    await persistance.insert(req['body']);
  }
  
  res.send('Pot is registered');
});

router.post('/update', async function(req, res) {
  try {
    const data = req['body'];
    const { id, weight } = data;
    console.log('data***********', data, id, weight);
    const record = await persistance.find({ pot_id: id });
    console.log('record***********', record);
    if(record) {
      const { empty_pot_weight, pot_capacity } = record;

      let params;
      if (empty_pot_weight === 0 && weight >= 100 ) {
        params = { empty_pot_weight: weight }
      } else if (pot_capacity <= 0 && empty_pot_weight > 0 && weight > empty_pot_weight) {
        params = { pot_capacity: weight }
      } else if (weight < pot_capacity) {
        params = { current_weight: weight }
      }

      console.log('params***********', params);
      if(params) {
        console.log('params222222***********', params);
        await persistance.update(data.id, params);
      }
      
      res.send('Pot is updated');
    } else {
      res.send('Pot not found');
    }
  } catch(e) {
    console.log('Pot not updated', e);
    res.send('Pot not updated');
  }
  
});

module.exports = router;
