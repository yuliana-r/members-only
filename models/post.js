const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 100, required: true },
  text: { type: String, minLength: 1, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
