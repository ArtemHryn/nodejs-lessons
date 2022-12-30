const { Post } = require("../models/postModel");
const { NotFound } = require("../helper/errors");

const getPosts = async (userId, { skip, limit }) => {
  return await Post.find({ userId })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort({topic: 1});
};

const getPostsById = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId, userId });

  if (!post) throw new NotFound(`post ${postId} not found`);

  return post;
};

const addPost = async (fields, userId) => {
  const post = new Post({ ...fields, userId });
  return await post.save();
};
const changePostById = async (postId, fields, userId) => {
  await Post.findOneAndUpdate({ _id: postId, userId }, { $set: fields });
};
const deletePostById = async (postId, userId) => {
  await Post.findOneAndDelete({ _id: postId, userId });
};

module.exports = {
  getPosts,
  getPostsById,
  addPost,
  changePostById,
  deletePostById,
};
