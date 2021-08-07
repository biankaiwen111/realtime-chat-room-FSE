const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required!",
  },
  password: {
    type: String,
    required: "Password is required!",
  },
});

module.exports = mongoose.model("User", userSchema);
