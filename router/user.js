const express = require("express");
const { getFollowersCount, getFollowingCount } = require("../controller/user");
const router = express.Router();

// ... (other routes)

// Get followers count
router.get("/:userId/followersCount", getFollowersCount);

// Get following count
router.get("/:userId/followingCount", getFollowingCount);

module.exports = router;
