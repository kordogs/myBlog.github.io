const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  cover: String,
  time: Date,
  //genre: String,
  author: { type: ObjectId, ref: "User" },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
