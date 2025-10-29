const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.index);
indexRouter.get("/sign-up", indexController.showSignupForm);
indexRouter.post("/sign-up", indexController.submitSignupForm);
indexRouter.get("/log-in", indexController.showLogInForm);
indexRouter.post("/log-in", indexController.submitLogInForm);

module.exports = indexRouter;
