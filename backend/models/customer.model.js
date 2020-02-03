const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  userId: {
    type: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    required: true
  },
  disability: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 500
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
