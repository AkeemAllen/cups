const router = require('express').Router();
const Product = require('../models/product.model');

/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *      - Products
 *    description: Returns all products
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/').get(async (req, res) => {
  await Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).jeson('Error: ' + err));
});

/**
 * @swagger
 * /products:
 *  post:
 *    tags:
 *      - Products
 *    description: Add a Product
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: product
 *        description: The Product to create
 *        schema:
 *          type: object
 *          required:
 *            - productName
 *            - quantity
 *            - price
 *            - category
 *          properties:
 *            productName:
 *              type: string
 *            quantity:
 *              type: number
 *            price:
 *              type: number
 *            category:
 *              type: string
 *    responses:
 *          '200':
 *            description: Product Added
 *          '400':
 *            description: An error occurred
 */
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
 * /products/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *    tags:
 *      - Products
 *    description: Return a single Product
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Product Not Found
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').get(async (req, res) => {
  await Product.findById(req.params.id)
    .then(product => {
      if (product === null) {
        res.status(404).json('Product Not Found');
      } else {
        res.status(200).json(product);
      }
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *    tags:
 *      - Products
 *    description: Deletes a single product
 *    responses:
 *      '200':
 *        description: Product deleted
 *      '404':
 *        description: Product Not Found
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').delete(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if (product === null) {
        res.status(404).json('Product Not Found');
      } else {
        res.status(200).json('Product Deleted');
      }
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /products/update/{id}:
 *  post:
 *    tags:
 *      - Products
 *    description: Updates a product's Information
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
 *        description: The Product to Update
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
 *            image:
 *              type: string
 */
router.route('/update/:id').put(async (req, res) => {
  await Product.findById(req.params.id)
    .then(product => {
      // eslint-disable-next-line no-unused-expressions
      req.body.productName !== undefined
        ? (product.productName = req.body.productName)
        : null;
      // eslint-disable-next-line no-unused-expressions
      req.body.category !== undefined
        ? (product.category = req.body.category)
        : null;
      // eslint-disable-next-line no-unused-expressions
      req.body.quantity !== undefined
        ? (product.quantity = req.body.quantity)
        : null;
      // eslint-disable-next-line no-unused-expressions
      req.body.price !== undefined ? (product.price = req.body.price) : null;
      // eslint-disable-next-line no-unused-expressions
      req.body.image !== undefined ? (product.image = req.body.image) : null;

      product
        .save()
        .then(() => res.json(product))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
