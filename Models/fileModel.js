import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },

  fileId: {
    type: String,
    required: true,
  },

  data: {
    type: Buffer,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

const file = mongoose.models.fileof || mongoose.model("fileof", fileSchema);

export default file;
