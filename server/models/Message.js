const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: "User is required!",
    ref: "User",
  },
  message: {
    type: String,
    required: "Message is required!",
  },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
