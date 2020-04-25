const router = require('express').Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');

/**
 * @swagger
 * /orders:
 *  get:
 *    tags:
 *      - Orders
 *    description: Returns all orders
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/').get(async (req, res) => {
  await Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /orders:
 *  post:
 *    tags:
 *      - Orders
 *    description: Add an Order
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: order
 *        description: The Order to create
 *        schema:
 *          type: object
 *          required:
 *            - user
 *            - products
 *            - cost
 *          properties:
 *            userId:
 *              type: string
 *            products:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  product:
 *                    type: string
 *                  quantity:
 *                    type: number
 *            cost:
 *              type: number
 *    responses:
 *          '200':
 *            description: A successful response
 *          '400':
 *            description: An error occurred
 */
router.route('/').post(async (req, res) => {
  const user = await User.findById(req.body.userId);
  const products = req.body.products;
  const cost = req.body.cost;

  if (user === null) {
    res.status(404).json('User not found!');
  }

  const newOrder = new Order({
    user: user,
    products: [...products],
    cost: cost
  });

  return newOrder
    .save()
    .then(() => res.json(newOrder))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *    tags:
 *      - Orders
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
 * /orders/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *    tags:
 *      - Orders
 *    description: Deletes a single order
 *    responses:
 *      '200':
 *        description: Order deleted
 *      '404':
 *        description: Order Not Found
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').delete(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
    .then(order => {
      if (order === null) {
        res.status(404).json('Order Not Found');
      } else {
        res.status(200).json(order);
      }
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /orders/update/{id}:
 *  post:
 *    tags:
 *      - Orders
 *    description: Updates a Orders's Information
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
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
      // req.body.orderName !== undefined
      //   ? (order.orderName = req.body.orderName)
      //   : null;
      // req.body.category !== undefined
      //   ? (order.category = req.body.category)
      //   : null;
      // req.body.quantity !== undefined
      //   ? (order.quantity = req.body.quantity)
      //   : null;
      // req.body.price !== undefined ? (order.price = req.body.price) : null;

      order
        .save()
        .then(() => res.json('Order Updated'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
