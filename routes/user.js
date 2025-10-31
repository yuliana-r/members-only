const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/:userId/delete", userController.getDeleteUserConfirmation);
userRouter.post("/:userId/delete", userController.deleteUser);

module.exports = userRouter;
