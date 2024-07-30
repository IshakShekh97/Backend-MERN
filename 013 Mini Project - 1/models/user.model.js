const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/miniproject_1");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  profilepic: {
    type: String,
    default: "default.jpg",
  },
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "post",
      default: [],
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
