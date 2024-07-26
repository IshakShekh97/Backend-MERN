const express = require("express");
const app = express();

const userModel = require("./user.modal");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Ishak",
    username: "ishak90",
    email: "shekhishak90@gmail.com",
  });
  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { name: "Ishak" },
    { name: "Shekh Ishak" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  res.send(allUsers);
});

app.get("/readone", async (req, res) => {
  let allUsers = await userModel.find({ name: "Ishak" });
  res.send(allUsers);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ name: "Ishak" });
  res.send(deletedUser);
});

app.listen(3000, () => {
  console.log("Server is running on port localhost:3000");
});
