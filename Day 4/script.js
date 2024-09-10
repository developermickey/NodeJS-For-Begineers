const express = require("express"); // yaha par ek function store hai

const app = express();

const port = 3000;

// Middleware jab bhi server request accept karta hai to route se pahle jis request se kuch check karna ho yeh kuch kam karwana ho use middleware kahte hai

// sari request accept ese ho kar jayegi app.use middleware se
app.use((req, res, next) => {
  console.log("Middleware executed");
  next(); // next kisi middleware ko call karega toh next middleware ko execute karega
});

// Routes

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about-us", (req, res) => {
  res.send("About Us");
});
app.get("/profile", (req, res, next) => {
  return next(new Error("Not Found"));
});

// error handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log("listening on port 3000");
});
