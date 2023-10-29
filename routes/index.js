let express = require("express");
let indexRouter = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");

const indexController = require("../controllers/indexController");

/* GET home page */
indexRouter.get("/", indexController.index);

/* GET request for sign up form */
indexRouter.get("/sign-up", indexController.sign_up_form_get);

/* POST request to submit sign up form */
indexRouter.post("/sign-up", indexController.sign_up_form_post);

/* GET request for log in form */
indexRouter.get("/log-in", indexController.log_in_form_get);

/* POST request to submit log in form */
indexRouter.post("/log-in", indexController.log_in_form_post);

/* GET request for logging out */
indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = indexRouter;
