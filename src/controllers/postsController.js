const {
  getPosts,
  getPostsById,
  addPost,
  changePostById,
  deletePostById,
} = require("../services/postServices");

const getPostsController = async (req, res) => {
  const posts = await getPosts();
  res.json({ posts });
};

const getPostByIdController = async (req, res) => {
  const { postID } = req.params;
  const post = await getPostsById(postID, res);
  res.json({ post });
};

const addPostController = async (req, res) => {
  const post = await addPost(req.body);
  
  res.status(200).json({ data: post._doc, message: "topic has been created" });
};

const changePostController = async (req, res) => {
  const { postID } = req.params;
  await changePostById(postID, req.body);
  res.json({ message: `post ${postID} has been updated` });
};

const deletePostController = async (req, res) => {
  const { postID } = req.params;
  deletePostById(postID);
  res.json({ message: `post ${postID} has been deleted` });
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
