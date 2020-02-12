const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    minlength: 3
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  productImage: {
    type: Image,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
