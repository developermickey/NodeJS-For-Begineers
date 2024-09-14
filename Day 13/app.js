const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// app.get("/", (req, res) => {
//   res.cookie("name", "mukesh");
//   res.send("Cookie Set Successfully!");
// });

// app.get("/read", (req, res) => {
//   console.log(req.cookies);
//   res.send("Read Page");
// });

app.get("/", (req, res) => {
  //   bcrypt.genSalt(10, function (err, salt) {
  //     bcrypt.hash("mickey@1234", salt, function (err, hash) {
  //       console.log(hash);
  //     });
  //   });

  //   bcrypt.compare(
  //     "mickey@1234",
  //     "$2b$10$ZwspuLQ0XRuyBqg4wOAYmOLGF743jatK0VeljN/vmoqGqUJGZ5to.",
  //     function (err, result) {
  //       console.log(result);
  //     }
  //   );

  let token = jwt.sign({ email: "mukeshpathak345@gmail" }, "secret");
  res.cookie("token", token);
  res.send("Done");
});
app.get("/read", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});
app.listen(port, () => {
  console.log(`Server Running Of Port ${port}`);
});
