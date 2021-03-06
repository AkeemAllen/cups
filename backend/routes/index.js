const router = require('express').Router();
const usersRouter = require('./user');
const productsRouter = require('./product');
const ordersRouter = require('./order');

router.use('/orders', ordersRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;
