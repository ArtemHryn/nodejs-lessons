const uploadFileController = async(req, res) => {
  // res.setHeader("content-type", "multipart/form-data");
  const { desc } = req.body;
  res.status(200).json({ message: "done", desc });
};

module.exports = { uploadFileController };
