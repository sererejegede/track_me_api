const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  const user = new User({ email, password, name });

  user
    .save()
    .then(() => {
      const token = jwt.sign({ email, name }, 'SECRET_KEY_GOES_HERE');
      res.json({
        token
      });
    })
    .catch(err => {
      let errResponse = err.message;
      if (errResponse.includes('duplicate')) {
        errResponse = 'Email already exists';
      }
      res.status(422).json({
        message: errResponse
      });
    });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  let error = 'Invalid email or password';
  if (!email || !password) {
    return res.status(422).json({
      message: 'Email and password required'
    });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(422).json({ error });
  user
    .comparePassword(password)
    .then(value => {
      const token = jwt.sign(
        { email, name: user.name },
        'SECRET_KEY_GOES_HERE'
      );
      res.json({ token });
    })
    .catch(err => {
      return res.status(422).json({ error });
    });
});

module.exports = router;
