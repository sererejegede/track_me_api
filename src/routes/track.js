const express = require('express');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const authGuard = require('../middlewares/authGuard');

const router = express.Router();

router.use(authGuard);

router.get('/track', async (req, res) => {
  const tracks = await Track.find({user_id: req.user._id});
  return res.json({data: tracks}).status(200)
});

router.post('/track', async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    res.status(422).json({
      error: 'You must provide a name and locations'
    });
  }

  const track = new Track({name, locations, user_id: req.user._id});
  await track.save();

  res.status(200).json({
    message: 'Saved successfully',
    data: track
  })

});

module.exports = router;
