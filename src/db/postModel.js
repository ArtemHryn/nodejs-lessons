const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  topic: { type: String, required: true, unique: true },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Posts", postSchema);

module.exports = {
  Post,
};
