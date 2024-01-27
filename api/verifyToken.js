const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.verify = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).send(`Token is not valid`);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send(`you are not authenticated.`);
  }
};
