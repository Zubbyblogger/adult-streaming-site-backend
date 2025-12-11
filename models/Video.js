const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled" },
  description: { type: String, default: "" },
  url: { type: String, default: "" },
  thumbnailUrl: { type: String, default: "" },
  duration: { type: Number, default: 0 },
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model("Video", VideoSchema);
