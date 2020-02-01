const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: Object.id,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
