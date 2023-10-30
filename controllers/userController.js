const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Post = require("../models/post");

exports.user_delete_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();

  if (user === null) {
    const err = new Error("User not found!");
    err.status = 404;
    return next(err);
  }

  res.render("delete-user", { title: "delete account", user });
});

exports.user_delete_post = asyncHandler(async (req, res, next) => {
  await Promise.all([
    Post.deleteMany({ author: req.body.userid }).exec(),
    User.findByIdAndRemove(req.body.userid).exec(),
  ]);

  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
});
