// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  occupation: String,
  income: Number,
});

module.exports = mongoose.model("User", userSchema);
