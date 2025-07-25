import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  const user = await User.findOne({ email, isActive: true });

  // Check if user exists and is active
  if (!user) throw new AppError("Invalid credentials or user not found", 401);

  // Check password (assuming you have a method to compare passwords)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  // Generate token
  const token = generateToken(user._id.toString(), user.role);

  // Update last login time
  user.lastLogin = new Date();
  await user.save();

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
