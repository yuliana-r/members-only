let express = require("express");
let indexRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const indexController = require("../controllers/indexController");

/* GET home page */
indexRouter.get("/", indexController.index);

/* GET request for sign up form */
indexRouter.get("/sign-up", indexController.sign_up_form_get);

/* POST request to submit sign up form */
indexRouter.post("/sign-up", indexController.sign_up_form_post);

module.exports = indexRouter;
