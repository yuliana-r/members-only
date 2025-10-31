require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const pool = require("./db/pool");
const db = require("./db/queries/user_queries");

const app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// static files & body parsing
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// session setup
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 }, // 10 days
  }),
);

// flash messages
app.use(flash());

// Passport setup
// define strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      if (!user)
        return done(null, false, {
          message: "Incorrect username or password",
        });

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// initialize passport and enable sessions
app.use(passport.initialize());
app.use(passport.session());

// reference current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

//assign routers to paths
const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

// 404 handler
app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { url: req.originalUrl, title: "Page not found" });
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
