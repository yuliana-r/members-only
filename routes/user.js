let express = require("express");
let userRouter = express.Router();

const userController = require("../controllers/userController");

/* GET delete user form */
userRouter.get("/users/:id/delete", userController.user_delete_get);

/* POST request to delete user */
userRouter.post("/users/:id/delete", userController.user_delete_post);

module.exports = userRouter;
