const express = require("express");
const app = express();
const port = 3000;

const userModel = require("./models/User");
const postModel = require("./models/Post");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "mickey",
    email: "mickey@mickey.com",
    age: 28,
  });

  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "What is Full Stack Development",
    user: "66e535c58955835e0db96f27",
  });
  let user = await userModel.findOne({ _id: "66e535c58955835e0db96f27" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(port, () => {
  console.log(`Server Running Of Port ${port}`);
});
