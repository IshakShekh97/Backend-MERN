const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { error, log } = require("console");

const port = 3010;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) throw err;
    res.render("show", { file: req.params.filename, content: filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { file: req.params.filename });
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new.split(" ").join("")}.txt`,
    (err) => {
      if (err) throw err.message;
      res.redirect("/");
    }
  );
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) throw err.message;
      res.redirect("/");
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
