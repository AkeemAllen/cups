const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/cupsdatabase';
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB connection established successfully');
});

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const usersRouter = require('./routes/user');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send(
    "Hey There, this is our application's backend\nThis is where all the magic happens"
  );
});

module.exports = app;
