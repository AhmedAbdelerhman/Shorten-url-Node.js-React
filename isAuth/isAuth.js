const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ error: "authorization error" });
  const token = req.headers.authorization.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.jwtSecretKey);
    req.user = await User.findById(decodedToken.userId).select("-password");
  } catch (error) {
    return res.status(401).json({ error: "un able to verify" });
  }
  if (!decodedToken) {
    return res.status(401).json({ status: "failed",
    message: "auth failed, failed to login user" });
  }

  next();
};
