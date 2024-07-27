const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_assciation_1");

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: String,
  // posts: Array,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

module.exports = mongoose.model("user", userSchema);
