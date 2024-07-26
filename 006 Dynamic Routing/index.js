const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// Dynamic Routes
app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Welcome ${id} to your profile page`);
});

app.get("/author/:author/:age", (req, res) => {
  const username = req.params.author;
  const age = req.params.age;

  res.send(`Age of ${username} is ${age}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
