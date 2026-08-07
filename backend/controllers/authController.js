import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // If password has select:false in User model
  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: "Your account has been disabled.",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  const token = generateToken(user);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      institute: user.institute,
    },
  });
});

// Get Current Logged-in User
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export { loginUser, getCurrentUser };
