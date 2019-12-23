const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  os: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("votes", voteSchema);
