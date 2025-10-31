const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

const { redirectIfAuthenticated } = indexController;

indexRouter.get("/", indexController.index);
indexRouter.get(
  "/sign-up",
  redirectIfAuthenticated,
  indexController.showSignupForm,
);
indexRouter.post(
  "/sign-up",
  redirectIfAuthenticated,
  indexController.submitSignupForm,
);
indexRouter.get(
  "/log-in",
  redirectIfAuthenticated,
  indexController.showLogInForm,
);
indexRouter.post(
  "/log-in",
  redirectIfAuthenticated,
  indexController.submitLogInForm,
);
indexRouter.get("/log-out", indexController.logUserOut);
indexRouter.post("/join", indexController.submitJoinForm);

module.exports = indexRouter;
