const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  // console.warn(req.headers);
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unathenticated' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'SECRET_KEY_GOES_HERE', (err, payload) => {
    if (err) return res.status(401).json({ message: 'Unathenticated' });
    req.user = payload;
    next();
  });
};
