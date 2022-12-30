const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, unique: true },
    text: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = {
  Post,
};
