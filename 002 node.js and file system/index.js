const fs = require("fs");

// ! File System

/*
const data =
  "Hello World! , This is Ishak , and I am learning Javascript , a BCA  student at UCSD , and I am learning Nodejs and File  ";
fs.writeFile("./hey.txt", data, (err) => {
  if (err) console.error(err);
  else console.log("Created");
});

const newData =
  " I am learning Javascript , a BCA student at Parul University , and I am learning Nodejs and File ";

fs.appendFile("./hey.txt", newData, (err) => {
  if (err) console.error(err);
  else console.log("Appended");
});

fs.rename("./hey.txt", "./hello.txt", (err) => {
  if (err) console.error(err);
  else console.log("Renamed");
});

fs.copyFile("./hello.txt", "./copy/copy.txt", (err) => {
  if (err) console.error(err);
  else console.log("Copied");
});

fs.unlink("./random.txt", (err) => {
  if (err) console.error(err);
  else console.log("Deleted");
});

fs.rm("./copy", { recursive: true }, (err) => {
  if (err) console.error(err.message);
  else console.log("Deleted folder");
});

*/

// ! HTTP Module

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World! , Ishak");
});

server.listen(8000, () => {
  console.log("Listening on port localhost:8000");
});
