const fs = require("fs");
const http = require("http");
// writeFile - Done
// appendFile - Done
// rename - Done remain
// copyFile -  Done for copy files
// unlink - Done for delete file
// rmdir

// fs.writeFile("hello.txt", "hello world", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Done");
//   }
// });

// fs.appendFile("hello.txt", "hello duniya", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Done");
//   }
// });

// fs.rename("hello.txt", "myrema.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Done");
//   }
// });

// fs.copyFile("hello.txt", "./copy/copy.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Done");
//   }
// });

// fs.unlink("hello.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File Deleted Done");
//   }
// });

// fs.rmdir("./copy", { recursive: true }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Folder deleted Done");
//   }
// });

// fs.rm("./copy", { recursive: true }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Folder deleted Done");
//   }
// });

// fs.mkdir("./css", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Folder created Done");
//   }
// });

// fs.readFile("./index.html", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// protocol is set of rules
// http and https

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000);
