const express = require("express");
const app = express();
const port = 3000;

const userModel = require("./models/User");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/create", async (req, res) => {
  let createUser = await userModel.create({
    name: "Srishti",
    username: "srishti",
    email: "srishti@srishti.com",
  });
  res.send(createUser);
});

app.get("/update", async (req, res) => {
  //   userModel.findOneUpdate({findOne}, {update}, {new: true});
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "mike" },
    { name: "Mukesh" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.findOne({ username: "mike" });
  res.send(allUsers);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ username: "mike" });
  res.send(deletedUser);
});

app.get("/readall", async (req, res) => {
  let allUsers = await userModel.find();
  res.send(allUsers);
});

app.listen(port, () => {
  console.log(`Server Running Of Port ${port}`);
});
