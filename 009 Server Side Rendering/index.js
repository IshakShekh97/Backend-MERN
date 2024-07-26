const express = require("express");
const path = require("path");
const userModel = require("./models/user-model");
const app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/create", async (req, res) => {
  await userModel.create({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
  });
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/update/:id", async (req, res) => {
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, image: req.body.image, email: req.body.email },
    {
      new: true,
    }
  );

  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let allusers = await userModel.find();
  res.render("read", { users: allusers });
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user: user });
});

app.listen(3000, () => {
  console.log("Server is running on port localhost:3000");
});
