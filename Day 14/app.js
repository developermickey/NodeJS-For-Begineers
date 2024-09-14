const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/User");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email: email }, "mikkkkkkkkkk");
      res.cookie("token", token);
      res.redirect("/login");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.send("Something is wrong");
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, "mikkkkkkkkkk");
      res.cookie("token", token);
      return res.send("You can login");
    } else res.send("No you can't Login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server Running Of Port ${port}`);
});
