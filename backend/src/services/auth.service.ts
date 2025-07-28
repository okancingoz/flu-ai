import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import redisClient from "../config/redisClient";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email, isActive: true }).select(
    "+password"
  );
  if (!user) throw new AppError("Invalid credentials or user not found", 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

  const token = generateToken(user._id.toString(), user.role);

  user.lastLogin = new Date();
  await user.save();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const logoutService = async (token: string) => {
  const decoded = jwt.decode(token) as { exp: number } | null;

  if (!decoded || !decoded.exp) {
    throw new AppError("Invalid token", 400);
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const expireInSeconds = decoded.exp - currentTime;

  if (expireInSeconds <= 0) {
    throw new AppError("Token has already expired", 400);
  }

  await redisClient.set(`bl_${token}`, "blacklisted", {
    EX: expireInSeconds,
  });

  return { message: "Logout successful" };
};

export const registerService = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
    isActive: true,
  });

  if (existingUser) throw new AppError("User already exists", 400);

  const newUser = new User({
    name,
    username,
    email,
    password,
  });

  await newUser.save();

  return {
    id: newUser._id,
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
  };
};
