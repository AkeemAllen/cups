const router = require('express').Router();
const usersRouter = require('./user');
const productsRouter = require('./product');
const imagesRouter = require('./images');

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/images', imagesRouter);

module.exports = router;
