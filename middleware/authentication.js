const jwt = require("jsonwebtoken");
const User = require("../model/user");
exports.authenticateToken = async (req, res, next) => {
  const token = req.cookies["token"];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = user._id;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
