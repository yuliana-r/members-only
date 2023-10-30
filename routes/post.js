let express = require("express");
let postRouter = express.Router();

const postController = require("../controllers/postController");

/* GET request for new message form */
postRouter.get("/new", postController.new_post_form_get);

/* POST request to submit new message form */
postRouter.post("/new", postController.new_post_form_post);

module.exports = postRouter;
