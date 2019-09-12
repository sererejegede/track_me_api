require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authGuard = require('./middlewares/authGuard');

// Mongo Setup
const mongoURI =
  'mongodb+srv://user_first:bP2Fwt6VjD2Zg6z@cluster0-34vnh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () =>
  console.log('Conected to Mongodb...')
);
mongoose.connection.on('error', err =>
  console.error('Error connecting to Mongodb', err)
);

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

app.get('/', authGuard, (req, res) => {
  res.json({ message: 'Hello App!' });
});

app.listen(3000, () => console.log('Listening on port 3000...'));
