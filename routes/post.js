let express = require("express");
let postRouter = express.Router();

const postController = require("../controllers/postController");

/* GET request for new message form */
postRouter.get("/new", postController.new_post_form_get);

/* POST request to submit new message form */
postRouter.post("/new", postController.new_post_form_post);

/* GET delete message form */
postRouter.get("/posts/:id/delete", postController.post_delete_get);

/* POST request to delete message */
postRouter.post("/posts/:id/delete", postController.post_delete_post);

module.exports = postRouter;
