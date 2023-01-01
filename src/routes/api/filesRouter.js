const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadFile } = require("../../controllers/fileController");
const { asyncWrapper } = require("../../helper/apiHelpers");

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, path.resolve("./src/public"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadFile)
);

module.exports = router;
