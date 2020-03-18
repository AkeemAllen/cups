const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
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
        required: false
      },
      accountBalance: {
        type: Number,
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
    },
    isAdmin: Boolean
  },
  { timestamps: true }
);

const User = mongoose.model('User', userModel);

module.exports = User;
