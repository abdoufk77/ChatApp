const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
  username: String,
  password: String,
});

const user = mongoose.model("user", UserShema);

module.exports = user;
