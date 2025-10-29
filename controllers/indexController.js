const { body, validationResult } = require("express-validator");
const db = require("../db/queries/user_queries");
const bcrypt = require("bcryptjs");

function handleServerError(res, error, message = "Internal Server Error") {
  //console.error(message, error);
  res.status(500).send(message);
}

// GET /
exports.index = async (req, res) => {
  try {
    res.render("index", {
      title: "home",
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// GET /sign-up
exports.showSignupForm = async (req, res) => {
  res.render("sign_up_form", {
    title: "sign up",
  });
};

// POST /sign-up
exports.submitSignupForm = [
  body("firstname")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be between 2 and 30 characters long")
    .isAlpha()
    .withMessage("First name can only contain letters"),

  body("lastname")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be between 2 and 30 characters long")
    .isAlpha()
    .withMessage("Last name can only contain letters"),

  body("username")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Username must be between 8 and 20 characters long")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .custom(async (value) => {
      const userExists = await db.getUsername(value);
      if (userExists) {
        throw new Error("Username is already taken");
      }
      return true;
    }),

  body("password")
    .trim()
    .custom((value) => {
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (!/\d/.test(value)) {
        throw new Error("Password must contain at least 1 number");
      }
      if (/\s/.test(value)) {
        throw new Error("Password cannot contain spaces");
      }
      return true;
    }),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),

  async (req, res, next) => {
    const { firstname, lastname, username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //console.log("Validation failed:", errors.array());
      return res.render("sign_up_form", {
        title: "Sign up",
        firstname,
        lastname,
        username,
        errors: errors.array(),
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.insertUser(
        firstname,
        lastname,
        username,
        hashedPassword,
        false,
        false,
      );
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];
