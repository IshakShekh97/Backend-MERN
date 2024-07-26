const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/server-side-rendering-test");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("User", UserSchema);
