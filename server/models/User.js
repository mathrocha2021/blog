const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "MongoDB: Your username is required"],
  },
  email: {
    type: String,
    required: [true, "MongoDB: Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "MongoDB: Your password is required"],
  },
  profilePicture: {
    type: String,
    required: true,
  }
  ,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;