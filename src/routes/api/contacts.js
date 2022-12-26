const express = require("express");

const { asyncWrapper } = require("../../helper/apiHelpers");
const { addPostValidation } = require("../../middlewares/validationMiddleware");
const {
  getPostsController,
  addPostController,
  getPostByIdController,
  deletePostController,
  changePostController,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", asyncWrapper(getPostsController));

router.get("/:postID", asyncWrapper(getPostByIdController));

router.post("/", addPostValidation, asyncWrapper(addPostController));

router.delete("/:postID", asyncWrapper(deletePostController));

router.put("/:postID", asyncWrapper(changePostController));

module.exports = router;
