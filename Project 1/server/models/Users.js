const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "please add email"],
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    facebookId: String,
    githubId: String,
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook", "github"],
      default: "local",
    },
    role: {
      type: String,
      required: [true, "please add role"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
