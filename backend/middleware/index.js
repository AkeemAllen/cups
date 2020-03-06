const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');

exports.useCors = app => {
  app.use(cors());
};

exports.useMorgan = app => {
  app.use(morgan('combined'));
};

exports.useSwagger = app => {
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

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

exports.useMethodOverride = app => {
  app.use(methodOverride('_method'));
};

exports.useFileUpload = uri => {
  const storage = new GridFsStorage({
    url: uri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
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
  return upload;
};

// exports.mongoConnection = uri => {
//   let gfs;

//   mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   });

//   let connection = mongoose.connection;

//   connection.once('open', () => {
//     gfs = Grid(connection.db, mongoose.mongo);
//     gfs.collection('uploads');
//     console.log('MongoDB connection established successfully');
//   });
// };
