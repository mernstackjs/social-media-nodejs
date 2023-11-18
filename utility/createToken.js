const jwt = require("jsonwebtoken");
// Function to generate a JWT token
exports.generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};
