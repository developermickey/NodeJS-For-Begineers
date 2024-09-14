const mongoose = require("mongoose");

// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017/myDBTestConnection");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);

// Define the schema for the user collection
