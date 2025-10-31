const db = require("../db/queries/user_queries");

//GET /users/:userId/delete
exports.getDeleteUserConfirmation = async (req, res) => {};

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
