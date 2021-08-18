const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 1
  },
  email: {
    type: String,
    require: true,
    min: 1
  },
  password: {
    type: String,
    require: true,
    min: 1
  },
  is_active: {
    type: Boolean,
    require: true
  },
  cellphone : {
    type: String,
    require: false,
    min: 1
  },
  address : {
    type: String,
    require: false,
    min: 1
  },
  refresh_token: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model("User", userSchema);