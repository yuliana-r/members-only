const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/new", postController.showNewPostForm);
postRouter.post("/new", postController.submitNewPostForm);

module.exports = postRouter;
