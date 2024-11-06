const mongoose = require('mongoose');
// describes the user schema for each user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  occupation: String,
  income: Number,
});

module.exports = mongoose.model('User', userSchema);
