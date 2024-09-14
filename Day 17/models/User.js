const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/miniblogApp");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: String,
  email: String,
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
