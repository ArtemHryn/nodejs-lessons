const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    active: { type: Boolean, default: true },
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = {
  Verification,
};