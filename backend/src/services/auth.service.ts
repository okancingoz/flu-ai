import bcrypt from "bcryptjs";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email, isActive: true });
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
