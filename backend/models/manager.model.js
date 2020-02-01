const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  userId: {
    type: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    required: true
  },
  branchNumber: {
    type: Number,
    required: true,
    default: 500
  }
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
