const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routes = require('./routes/index');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Cups Api',
      description:
        'An API for the new cups system to be implemented in coffee shops wordwide',
      contact: {
        name: 'Akeem Allen, Richard Robinson'
      },
      servers: [
        'https://mysterious-caverns-49185.herokuapp.com/',
        'http://localhost:5000/'
      ]
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', routes);

app.get('/', (req, res) => {
  res.send(
    "Hey There, this is our application's backend\nThis is where all the magic happens"
  );
});

module.exports = app;
