const { body, validationResult } = require("express-validator");
const db = require("../db/queries/post_queries");

//GET /posts/new
exports.showNewPostForm = async (req, res) => {
  res.render("new_post_form", {
    title: "new post",
    errors: [],
    postTitle: "",
    message: "",
  });
};

//POST /posts/new
exports.submitNewPostForm = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Title must be between 2 and 30 characters long"),
  body("message")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Message must be between 2 and 100 characters long"),

  async (req, res, next) => {
    const { title, message } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new_post_form", {
        title: "new post",
        postTitle: title,
        message: message,
        errors: errors.array(),
      });
    }

    try {
      await db.insertPost(title, message, req.user.user_id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];

//GET /posts/:id/delete
exports.getDeletePostConfirmation = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await db.getPostById(postId);

    if (!post) {
      const err = new Error("Post not found!");
      err.status = 404;
      return next(err);
    }

    res.render("confirm_delete_post", { title: "confirm delete post", post });
  } catch (error) {
    next(error);
  }
};

//POST /posts/:id/delete
exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    await db.deletePost(postId);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
