const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: Object.Id,
    required: true
  },
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
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
