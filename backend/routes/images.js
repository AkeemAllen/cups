const router = require('express').Router();
const Product = require('../models/product.model');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const { gfs } = require('../server');

const storage = new GridFsStorage({
  url: process.env.ATLAS_URI || 'mongodb://localhost:27017/cupsdatabase',
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

// Connecting to the database
// router.route('/').get(async (req, res) => {
//   await Product.find()
//     .then(products => res.json(products))
//     .catch(err => res.status(400).jeson('Error: ' + err));
// });

router.route('/upload').post(upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

router.route('/files').get((req, res) => {
  console.log(gfs);
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No files exist' });
    }

    return res.json(files);
  });
});

module.exports = router;
