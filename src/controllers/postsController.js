const {
  getPosts,
  getPostsById,
  addPost,
  changePostById,
  deletePostById,
} = require("../services/postServices");

const getPostsController = async (req, res) => {
  const { _id: userId } = req.user;
  let { skip = 0, limit = 5 } = req.query;
  limit = parseInt(limit) > 5 ? 5 : parseInt(limit)
  skip = parseInt(skip)
  const posts = await getPosts(userId, { skip, limit });
  res.json({ posts, skip, limit });
};

const getPostByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postID } = req.params;
  const post = await getPostsById(postID, userId);
  res.json({ post });
};

const addPostController = async (req, res) => {
  const { _id: userId } = req.user;
  const post = await addPost(req.body, userId);

  res.status(200).json({ data: post._doc, message: "topic has been created" });
};

const changePostController = async (req, res) => {
  const { postID } = req.params;
  const { _id: userId } = req.user;
  await changePostById(postID, req.body, userId);
  res.json({ message: `post ${postID} has been updated` });
};

const deletePostController = async (req, res) => {
  const { postID } = req.params;
  const { _id: userId } = req.user;
  deletePostById(postID, userId);
  res.json({ message: `post ${postID} has been deleted` });
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
