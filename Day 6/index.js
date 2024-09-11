const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  res.send(`Welcome, ${req.params.username}`);
});
app.get("/profile/:username/:age", (req, res) => {
  res.send(`Welcome, ${req.params.username} of age ${req.params.age}`);
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log("Server Running 3000");
});
