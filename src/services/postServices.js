const { Post } = require("../models/postModel");
const { NotFound } = require("../helper/errors");

const getPosts = async () => {
  return await Post.find({});
};

const getPostsById = async (id) => {
  const post = await Post.findById(id);

  if (!post) throw new NotFound(`post ${id} not found`);

  return post;
};

const addPost = async (fields) => {
  const post = new Post(fields);
  return await post.save();
};
const changePostById = async (id, fields) => {
  await Post.findByIdAndUpdate(id, { $set: fields });
};
const deletePostById = async (id) => {
  await Post.findByIdAndDelete(id);
};

module.exports = {
  getPosts,
  getPostsById,
  addPost,
  changePostById,
  deletePostById,
};
