const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/User");
const postModel = require("./models/Post");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLoggedin, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

app.get("/like/:id", isLoggedin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  console.log(post.user._id);
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1); // Remove the like from the array
  }
  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/update/:id", isLoggedin, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content },
    { new: true }
  );
  res.redirect("/profile");
});

app.post("/post", isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post);
  await user.save();
  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  let { name, username, email, age, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        name,
        username,
        email,
        age,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user._id }, "mikkkkkk");
      res.cookie("token", token);
      res.send("User registered");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "mikkkkkk");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

// Middleware

function isLoggedin(req, res, next) {
  if (req.cookies.token === "") {
    res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, "mikkkkkk");
    req.user = data;
    next();
  }
}

app.listen(port, () => {
  console.log(`Server Running Of Port port`);
});
