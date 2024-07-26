const cookieParser = require("cookie-parser"); // for reading cookies

const bcrypt = require("bcrypt"); // for hashing passwords

const jwt = require("jsonwebtoken"); //json Web Tocken

const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Cokies Start
app.get("/", (req, res) => {
  // creating Cookie
  res.cookie("name", "ishak shekh");
  res.send("Hello World!");
});

app.get("/read", (req, res) => {
  // cookies are shared accross all routes  in the same domain
  // req.cookies will have all the cookies that are shared across routes
  console.log(req.cookies);
  res.send("Read Page");
});
// Cookies End

// Bcrypt Start
app.get("/pass", (req, res) => {
  // Encryption of Password
  bcrypt.genSalt(10, (err, salt) => {
    // generate a random salt
    bcrypt.hash("password", salt, (err, hash) => {
      // hash the password with the random salt
      res.send("Password=" + salt);
    });
  });
});

app.get("/comp", (req, res) => {
  bcrypt.compare("password", "$2b$10$Zv6xWI7.Se06IRNEZOFf2", (err, result) => {
    res.send(result);
  });
});
// Bcrypt End

// Json Web Token (JWT)  Start
app.get("/jwt", (req, res) => {
  let token = jwt.sign(
    { email: "ishak@gmail.com" }, //data to send
    "secret" // secret key , based on this data is encrypted
  );
  res.cookie("token", token); // sending token to client
  res.send("JWT Token Send");
});

app.get("/jwt-read", (req, res) => {
  console.log(req.cookies.token);
  jwt.verify(req.cookies.token, "secret", (err, data) => res.send(data));
});
// JWT End

app.listen(8081, () => {
  console.log("Server is running on port localhost:8081.");
});
