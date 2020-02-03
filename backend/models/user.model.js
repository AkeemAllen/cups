const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  customerInfo: {
    disability: {
      type: String,
      required: true
    },
    accountBalance: {
      type: Number,
      default: 500,
      required: false
    },
    required: false
  },
  managerInfo: {
    branchNo: {
      type: Number,
      required: false
    },
    required: false
  }
});

const User = mongoose.model('User', userModel);

module.exports = User;
