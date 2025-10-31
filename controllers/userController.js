const db = require("../db/queries/user_queries");

//GET /users/:userId/delete
exports.getDeleteUserConfirmation = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await db.getUserById(userId);

    if (!user) {
      const err = new Error("User not found!");
      err.status = 404;
      return next(err);
    }

    res.render("confirm_delete_user", { title: "confirm delete user", user });
  } catch (error) {
    next(error);
  }
};

//POST /users/:userId/delete
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await db.deleteUser(userId);
    req.logout((error) => {
      if (error) return next(error);
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
};
