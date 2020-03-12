const router = require('express').Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

// Getting all orders
router.route('/').get(async (req, res) => {
  await Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post(async (req, res) => {
  const user = await User.findById(req.body.userId);
  const product = await Product.findById(req.body.productId);

  if (user === null) {
    res.status(404).json('User not found!');
  }
  if (product === null) {
    res.status(404).json('Product not found!');
  }

  const newOrder = new Order({ user, product });

  return newOrder
    .save()
    .then(() => res.json(newOrder))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /order/:id:
 *  get:
 *    description: Return a single Order
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').get(async (req, res) => {
  await Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /order/:id:
 *  delete:
 *    description: Deletes a single order
 *    response:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').delete(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
    .then(() => res.json('Order Deleted'))
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /order/update/:id:
 *  post:
 *    description: Updates a Orders's Information
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: order
 *        description: The Order to edit
 *        schema:
 *          type: object
 *          properties:
 *            orderName:
 *              type: string
 *            category:
 *              type: string
 *            quantity:
 *              type: number
 *            price:
 *              type: number
 */
router.route('/update/:id').put(async (req, res) => {
  await Order.findById(req.params.id)
    .then(order => {
      req.body.orderName !== undefined
        ? (order.orderName = req.body.orderName)
        : null;
      req.body.category !== undefined
        ? (order.category = req.body.category)
        : null;
      req.body.quantity !== undefined
        ? (order.quantity = req.body.quantity)
        : null;
      req.body.price !== undefined ? (order.price = req.body.price) : null;

      order
        .save()
        .then(() => res.json('Order Updated'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
