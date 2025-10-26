function handleServerError(res, error, message = "Internal Server Error") {
  console.error(message, error);
  res.status(500).send(message);
}

exports.index = async (req, res) => {
  try {
    res.render("index", {
      title: "home",
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
