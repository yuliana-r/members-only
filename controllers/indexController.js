const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const datefns = require("date-fns/format");

exports.index = asyncHandler(async (req, res, next) => {
  //show different header for logged in users/visitors
  const postCount = await Post.countDocuments({}).exec();
  const allPosts = await Post.find({}, "title text author timestamp")
    .sort({ timestamp: -1 })
    .populate("author")
    .exec();

  res.render("index", {
    title: "home",
    all_posts: allPosts,
    post_count: postCount,
    datefns: datefns,
  });
});

exports.sign_up_form_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "sign up" });
});

exports.sign_up_form_post = [
  body("firstname")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be between 2 and 30 characters long")
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name can only contain letters"),
  body("lastname")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be between 2 and 30 characters long")
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name can only contain letters"),
  body("username")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Username must be between 8 and 20 characters long")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .custom(async (value) => {
      const userExists = await User.findOne({ username: value });
      if (userExists) {
        throw new Error("Username is already taken");
      }
    }),
  body("password")
    .trim()
    .custom((value, { req }) => {
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
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("oops something went wrong...");
      res.render("sign-up-form", {
        title: "sign up",
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        username: req.body.username,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        const user = new User({
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
          isMember: false,
          isAdmin: false,
        });

        await user.save();
        res.redirect("/log-in");
      });
    }
  }),
];

exports.log_in_form_get = asyncHandler(async (req, res, next) => {
  res.render("log-in-form", { title: "log in" });
});

exports.log_in_form_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash: true,
});

exports.join_form_post = [
  body("secret")
    .trim()
    .custom(async (password, { req }) => {
      if (password === process.env.MEMBER_PASSWORD) {
        req.user.isMember = true;
      } else if (password === process.env.ADMIN_PASSWORD) {
        req.user.isMember = true;
        req.user.isAdmin = true;
      } else {
        throw new Error("Incorrect password");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const postCount = await Post.countDocuments({}).exec();
    const allPosts = await Post.find({}, "title text author timestamp")
      .sort({ timestamp: 1 })
      .populate("author")
      .exec();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("index", {
        title: "join",
        all_posts: allPosts,
        post_count: postCount,
        errors: errors.array(),
      });
    } else {
      await req.user.save();
      res.redirect("/");
    }
  }),
];
