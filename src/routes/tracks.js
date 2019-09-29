const express = require('express');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const authGuard = require('../middlewares/authGuard');

const router = express.Router();

router.use(authGuard);

router.get('/tracks', (req, res) => {
  res.json('Here');
});

module.exports = router;
