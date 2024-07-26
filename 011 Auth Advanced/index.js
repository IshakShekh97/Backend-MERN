const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usermodel = require("./models/user-model");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// Register Page
app.get("/register", (req, res) => {
  res.render("register");
});

// User create Logic
app.post("/create", (req, res) => {
  let { username, password, age, email } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hashPassword) => {
      let user = await usermodel.create({
        username,
        password: hashPassword,
        age,
        email,
      });

      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);
      console.log(user);
      res.redirect("/");
    });
  });
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Login Logic
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await usermodel.findOne({ email });
  if (!user) return res.send("somthing went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) res.send("somthing went wrong");
    if (result) {
      let token = jwt.sign({ email: user.email }, "secret");
      res.cookie("token", token);
      res.redirect("/");
    } else {
      return res.send("somthing went wrong");
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.listen(3000);
