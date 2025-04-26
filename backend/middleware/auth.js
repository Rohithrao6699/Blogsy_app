require("dotenv").config();
const jwt = require("jsonwebtoken");
const Jwt_Secret = process.env.JWT_SECRET;

function auth(req, res, next) {
  const { token } = req.headers;
  if (token) {
    const decodedInfo = jwt.verify(token, Jwt_Secret);
    req.userId = decodedInfo.id;
    next();
  } else {
    res.status(400).json({
      msg: "error, please login again",
    });
  }
}

module.exports = {
  auth,
};
