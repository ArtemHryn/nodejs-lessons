const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { uploadFileController } = require("../../controllers/fileController");
const { asyncWrapper } = require("../../helper/apiHelpers");

const FILE_DIR = path.resolve("./public");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
      const [, extension] = file.originalname.split(".");
      const fileFinishname = `${uuidv4()}.${extension}`;
      req.fileFinishname = fileFinishname;
    cb(null, fileFinishname);
  },
});

const uploadMiddleware = multer({ storage });

router.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadFileController)
);

router.use("/download", express.static(FILE_DIR));

module.exports = router;
