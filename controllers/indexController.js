function handleServerError(res, error, message = "Internal Server Error") {
  console.error(message, error);
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

exports.submitSignupForm = async (req, res) => {};
