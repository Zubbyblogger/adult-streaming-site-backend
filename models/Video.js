const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoSchema = new Schema({
  title: String,
  description: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  url: String,
  thumbnailUrl: String,
  type: { type: String, enum: ['video','image'], default: 'video' },
  duration: Number,
  resolutions: { type: Object, default: {} },
  status: { type: String, enum: ['pending','approved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Video', VideoSchema);
