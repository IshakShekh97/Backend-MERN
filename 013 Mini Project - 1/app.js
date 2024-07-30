const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = require("./models/user.model");
const postModel = require("./models/post.model");

const multerConfig = require("./config/multer.config");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// User Login Logic
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) res.status(500).send("Something Wrong !");

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) res.send("Error Happened !");
    if (result) {
      const token = jwt.sign({ email: email, userId: user._id }, "Secret");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.send("Wrong  Credentials!");
    }
  });
});

// Create User Logic
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/create", async (req, res) => {
  const { name, username, email, password, age } = req.body;
  let isAlreadyExist = await userModel.findOne({ email });
  if (isAlreadyExist) {
    return res.status(500).send("User Already Exist !");
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      let user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ email: email, userId: user._id }, "Secret");
      res.cookie("token", token);
      res.redirect("/");
    });
  });
});

//  User Logout Logic
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// Protected Routes
app.get("/profile", isLoggedIn, async (req, res) => {
  let { email, userId } = req.user;
  let user = await userModel.findById(userId).populate("posts");
  res.render("profile", { user });
});

// Create Post
app.post("/post", isLoggedIn, async (req, res) => {
  const { content } = req.body;
  let user = await userModel.findById(req.user.userId);
  let post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

// Edit Post

// app.get("/");

// Like Post
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findById(req.params.id);
  const { userId } = req.user;

  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
  } else {
    post.likes.splice(post.likes.indexOf(userId), 1);
  }
  await post.save();
  res.redirect("/profile");
});

// Edit Post
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findById(req.params.id).populate("user");
  res.render("editPost", { post });
});

app.post("/update/:id", async (req, res) => {
  const { content } = req.body;
  await postModel.findByIdAndUpdate(req.params.id, { content });
  res.redirect("/profile");
});

// Protected Route Logic
function isLoggedIn(req, res, next) {
  if (
    req.cookies.token == "" ||
    req.cookies.token == null ||
    !req.cookies.token
  ) {
    res.send(
      "You are not logged in!, Please login first to Access Profile Page"
    );
  } else {
    let data = jwt.verify(req.cookies.token, "Secret");
    req.user = data;
    next();
  }
}

app.listen(8080);
