require('./models/User');
require('./models/Track');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authGuard = require('./middlewares/authGuard');

const authRoutes = require('./routes/auth');
const trackRoutes = require('./routes/track');

const materialRoutes = require('./routes/material');

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
app.use(cors());
// Define routes here
app.use(authRoutes);
app.use(materialRoutes);
app.use(trackRoutes);

app.get('/', authGuard, (req, res) => {
  res.json({ message: 'Hello App!' });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on port ${process.env.PORT || 3000}...`)
);
