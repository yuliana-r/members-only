const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/new", postController.showNewPostForm);
postRouter.post("/new", postController.submitNewPostForm);
postRouter.get("/:postId/delete", postController.getDeletePostConfirmation);
postRouter.post("/:postId/delete", postController.deletePost);

module.exports = postRouter;
