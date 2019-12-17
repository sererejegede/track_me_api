const express = require('express');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const authGuard = require('../middlewares/authGuard');

const router = express.Router();

router.use(authGuard);

// Get user tracks
router.get('/track', async (req, res) => {
  const tracks = await Track.find({user_id: req.user._id});
  return res.json({data: tracks}).status(200)
});

// Create new track
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

// Update track
// TODO add location update functionality
router.put('/track/:_id', async (req, res) => {
  const track = await Track.findById(req.params._id)
  if (!track) {
    return res.status(422).json({
      error: 'Could not find track'
    })
  }
  track.name = req.body.name
  await track.save()

  res.status(200).json({
    message: 'Saved successfully',
    data: track
  })
})

router.delete('/track/:_id', async (req, res) => {
  const status = await Track.findByIdAndDelete(req.params._id)
  if (status) {
    res.status(204).json({
      message: 'Deleted Successfully'
    })
  }
})

module.exports = router;
