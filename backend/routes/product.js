const router = require('express').Router();
const Product = require('../models/product.model');

// Connecting to the database
router.route('/').get(async (req, res) => {
  await Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).jeson('Error: ' + err));
});

// Post Request Route
router.route('/').post(async (req, res) => {
  const productName = req.body.productName;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const category = req.body.category;

  const newProduct = new Product({
    productName,
    quantity,
    price,
    category
  });

  return newProduct
    .save()
    .then(() => res.json(newProduct))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /products/:id:
 *  get:
 *    description: Return a single Product
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').get(async (req, res) => {
  await Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /products/:id:
 *  delete:
 *    description: Deletes a single Product
 *    response:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').delete(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product Deleted'))
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /products/update/:id:
 *  post:
 *    description: Updates a Product's Information
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: product
 *        description: The Product to edit
 *        schema:
 *          type: object
 *          properties:
 *            productName:
 *              type: string
 *            category:
 *              type: string
 *            quantity:
 *              type: number
 *            price:
 *              type: number
 */
router.route('/update/:id').put(async (req, res) => {
  await Product.findById(req.params.id)
    .then(product => {
      req.body.productName !== undefined
        ? (product.productName = req.body.productName)
        : null;
      req.body.category !== undefined
        ? (product.category = req.body.category)
        : null;
      req.body.quantity !== undefined
        ? (product.quantity = req.body.quantity)
        : null;
      req.body.price !== undefined ? (product.price = req.body.price) : null;

      product
        .save()
        .then(() => res.json('Product Updated'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
