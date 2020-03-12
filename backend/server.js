const express = require('express');
const routes = require('./routes');
const middleWare = require('./middleware');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

require('dotenv').config();

const app = express();
const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/cupsdatabase';

let gfs;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let connection = mongoose.connection;

connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('MongoDB connection established successfully');
});

// MiddleWare
app.use(express.json());
// middleWare.mongoConnection(uri);
middleWare.useCors(app);
middleWare.useMorgan(app);
middleWare.useSwagger(app);
middleWare.useMethodOverride(app);
const upload = middleWare.useFileUpload(uri);

app.use('/', routes);

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
