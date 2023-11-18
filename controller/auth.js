const User = require("../model/user");
const { generateToken } = require("../utility/createToken");

exports.createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid username, email, and password.",
      });
    }

    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({
        success: false,
        message: "This user is already registered.",
      });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      message: "User is registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate a JWT token
    const token = generateToken(user);

    // // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    // You may generate a token here for authentication purposes

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
