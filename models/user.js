const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 30, required: true },
  lastName: { type: String, minLength: 2, maxLength: 30, required: true },
  username: {
    type: String,
    minLength: 8,
    maxLength: 20,
    required: true,
    unique: true,
  },
  password: { type: String, minLength: 8, maxLength: 100, required: true },
  isMember: { type: Boolean, default: false, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this.username}`;
});

module.exports = mongoose.model("User", UserSchema);
