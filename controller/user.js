const User = require("../model/user");

exports.getFollowersCount = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid userId.",
      });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Get followers count
    const followersCount = user.getFollowersCount();

    res.status(200).json({
      success: true,
      followersCount,
    });
  } catch (error) {
    console.error("Error fetching followers count:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

exports.getFollowingCount = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid userId.",
      });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Get following count
    const followingCount = user.getFollowingCount();

    res.status(200).json({
      success: true,
      followingCount,
    });
  } catch (error) {
    console.error("Error fetching following count:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
