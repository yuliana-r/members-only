let express = require("express");
let path = require("path");
let app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//assign routers to paths
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { url: req.originalUrl, title: "Page not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
