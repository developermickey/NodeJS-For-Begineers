const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const userModel = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let userCreated = await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.get("/delete/:id", async (req, res) => {
  let deleteUser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {
  let editUser = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user: editUser });
});

app.post("/update/:userid", async (req, res) => {
  let { image, name, email } = req.body;
  let updateUser = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { image, name, email },
    { new: true }
  );
  res.redirect("/read");
});

app.listen(port),
  () => {
    console.log(`Server running on port ${port}`);
  };
