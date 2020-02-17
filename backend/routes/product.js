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
  // const productImage = req.body.productImage;

  const newProduct = new Product({
    productName,
    quantity,
    price
    // productImage
  });

  return newProduct
    .save()
    .then(() => res.json(newProduct))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
