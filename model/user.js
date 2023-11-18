const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  roles: { type: String, enum: ["user", "admin"], default: "user" },
  interests: [String],
  joinDate: { type: Date, default: Date.now },
});

userSchema.methods.getFollowersCount = function () {
  return this.followers.length;
};

userSchema.methods.getFollowingCount = function () {
  return this.following.length;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const hashedPasword = await bcrypt.hash(this.password, 12);
    this.password = hashedPasword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// User Schema Methods
userSchema.methods.addFollower = function (followerId) {
  if (!this.followers.includes(followerId)) {
    this.followers.push(followerId);
  }
  return this.save();
};

userSchema.methods.removeFollower = function (followerId) {
  this.followers = this.followers.filter(
    (id) => id.toString() !== followerId.toString()
  );
  return this.save();
};

userSchema.methods.addFollowing = function (followingId) {
  if (!this.following.includes(followingId)) {
    this.following.push(followingId);
  }
  return this.save();
};

userSchema.methods.removeFollowing = function (followingId) {
  this.following = this.following.filter(
    (id) => id.toString() !== followingId.toString()
  );
  return this.save();
};

userSchema.methods.updateProfile = function (updateFields) {
  Object.assign(this, updateFields);
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
