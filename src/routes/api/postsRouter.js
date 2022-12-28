const express = require("express");

const { asyncWrapper } = require("../../helper/apiHelpers");
const { addPostValidation } = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  getPostsController,
  addPostController,
  getPostByIdController,
  deletePostController,
  changePostController,
} = require("../../controllers/postsController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getPostsController));

router.get("/:postID", asyncWrapper(getPostByIdController));

router.post("/", addPostValidation, asyncWrapper(addPostController));

router.delete("/:postID", asyncWrapper(deletePostController));

router.put("/:postID", asyncWrapper(changePostController));

module.exports = router;
