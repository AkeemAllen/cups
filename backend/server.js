const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routes = require('./routes');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

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

let gfs;
let connection = mongoose.connection;

connection.once('open', () => {
  // eslint-disable-next-line no-console
  // Initialize Stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('MongoDB connection established successfully');
});

// Create Storage Engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', routes);
app.use(methodOverride('_method'));
// app.use(multer({ storage }));

app.get('/', (req, res) => {
  res.send(
    "Hey There, this is our application's backend\nThis is where all the magic happens"
  );
});

module.exports = app;
