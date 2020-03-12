const router = require('express').Router();
const usersRouter = require('./user');
const productsRouter = require('./product');
const imagesRouter = require('./images');
const ordersRouter = require('./order');

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/products', productsRouter);
router.use('/images', imagesRouter);

module.exports = router;
