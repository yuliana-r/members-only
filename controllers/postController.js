const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

exports.new_post_form_get = asyncHandler(async (req, res, next) => {
  res.render("new-post-form", { title: "new message" });
});

exports.new_post_form_post = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Title must be between 2 and 30 characters long")
    .not()
    .isEmpty()
    .withMessage("Title is required"),
  body("message")
    .trim()
    .isLength({ min: 2, max: 250 })
    .withMessage("Message must be between 2 and 250 characters long")
    .not()
    .isEmpty()
    .withMessage("Message is required"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("oops something went wrong...");
      res.render("new-post-form", {
        title: "new message",
        messageTitle: req.body.title,
        message: req.body.message,
        errors: errors.array(),
      });
    } else {
      const message = new Post({
        title: req.body.title,
        text: req.body.message,
        author: req.user._id,
        timestamp: new Date(),
      });

      await message.save();
      res.redirect("/");
    }
  }),
];
