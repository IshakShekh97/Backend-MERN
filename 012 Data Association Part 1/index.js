const express = require("express");
const app = express();
const port = 8081;

const userModel = require("./models/user-model");
const postModel = require("./models/post-model");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "ishak",
    age: 20,
    email: "ishak@gmail.com",
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postData: "hello Everyone",
    user: "66a4de54dfd8fb64b844ae31",
  });

  let user = await userModel.findOne({ _id: "66a4e0aeda733a21cc4c2255" });
  await user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
