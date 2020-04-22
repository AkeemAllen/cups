const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: {
        type: Number,
        required: false,
        default: 1
      }
    }
  ],
  cost: {
    type: Number,
    required: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
