const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true, minlength: 4 },
});

userShema.index({ username: 1 }, { unique: true });

const userModel = mongoose.model("User", userShema);

module.exports = userModel;
