const express = require("express");

const app = express();
const port = 3000;

//! Middle Ware

app.use((req, res, next) => {
  console.log("Middle Ware Called");
  next();
});
app.use((req, res, next) => {
  console.log("another Middle Ware Called");
  next();
});

//! Route Creator
app.get("/", (req, res) => {
  res.send("This is Home page");
});

app.get("/profile", (req, res, next) => {
  res.send("This is Profile Page");
  // return next(new Error("Error in profile")); // Throwing Error
});

//! Error Handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error Handler");
  next();
});

// ! Port Creating
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
