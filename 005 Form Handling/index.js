const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log("This Is Middleware");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Home Page!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
