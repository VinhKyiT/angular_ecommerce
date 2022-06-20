const { updateUser } = require("../services/userService");

exports.update_user = async (req, res, next) => {
  const { userId } = req.params;
  const { fullName, email, password, photoUrl } = req.body;
  console.log(fullName, email, password, photoUrl);

  updateUser({ userId, fullName, email, password, photoUrl })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
