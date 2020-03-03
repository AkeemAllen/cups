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
  options: { useNewUrlParser: true, useUnifiedTopology: true },
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

// Upload Files
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

// Get All Files
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No files exist' });
    }

    return res.json(files);
  });
});

// Get Single file
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'File does not exist' });
    }

    return res.json(file);
  });
});

// Get Single image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'File does not exist' });
    }

    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an Image'
      });
    }
  });
});

app.get('/', (req, res) => {
  res.send(
    "Hey There, this is our application's backend\nThis is where all the magic happens"
  );
});

module.exports = app;
