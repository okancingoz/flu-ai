import { IUser } from "../interfaces/user.interface";
import User from "../models/User";
import { AppError } from "../utils/AppError";

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export type UpdateUserInput = Partial<
  Pick<IUser, "name" | "username" | "email" | "profilePicture">
>;

export const getAllUsersService = async () => {
  const users = await User.find({ isActive: true }).select("-password");
  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const updateUserService = async (
  id: string,
  updateData: UpdateUserInput
) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);

  if (updateData.name !== undefined) user.name = updateData.name;
  if (updateData.username !== undefined) user.username = updateData.username;
  if (updateData.email !== undefined) user.email = updateData.email;
  if (updateData.profilePicture !== undefined)
    user.profilePicture = updateData.profilePicture;

  user.updatedAt = new Date();
  await user.save();

  const { password, ...rest } = user.toObject();
  return rest;
};

export const deleteUserService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);

  user.isActive = false;
  user.updatedAt = new Date();
  await user.save();

  return { message: "Account deactivated successfully" };
};

export const forceDeleteUserService = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError("User not found", 404);

  return { message: "User deleted successfully" };
};

export const changePasswordService = async (
  id: string,
  { currentPassword, newPassword }: ChangePasswordInput
) => {
  const user = await User.findById(id).select("+password");
  if (!user) throw new AppError("User not found", 404);

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new AppError("Current password is incorrect", 400);

  user.password = newPassword;
  user.updatedAt = new Date();
  await user.save();

  return { message: "Password changed successfully" };
};
