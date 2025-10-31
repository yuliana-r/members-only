const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/new", postController.showNewPostForm);
postRouter.post("/new", postController.submitNewPostForm);
postRouter.post("/:postId/delete", postController.deletePost);

module.exports = postRouter;
