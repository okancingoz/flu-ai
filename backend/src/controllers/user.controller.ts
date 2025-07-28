import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  changePasswordService,
  deleteUserService,
  forceDeleteUserService,
  getAllUsersService,
  getUserByIdService,
  UpdateUserInput,
  updateUserService,
} from "../services/user.service";
import { AppError } from "../utils/AppError";

// Get all users controller
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  if (req.user.role !== "admin") throw new AppError("Access denied", 403);

  const users = await getAllUsersService();
  res.status(200).json({
    message: "Users retrieved successfully",
    data: users,
  });
});

// Get user by ID controller
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.user.role !== "admin" && req.user.id.toString() !== id) {
    throw new AppError("Access denied", 403);
  }

  const user = await getUserByIdService(id);
  res.status(200).json({ user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user._id.toString();
  const updateData: UpdateUserInput = req.body;

  const updatedUser = await updateUserService(id, updateData);

  res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user._id.toString();
  const result = await deleteUserService(id);
  res.status(200).json({ result });
});

export const forceDeleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const requestingUser = req.user;
    const targetUserId = req.params.id;

    if (
      requestingUser.role !== "admin" &&
      requestingUser._id.toString() !== targetUserId
    ) {
      throw new AppError("Access denied", 403);
    }

    const result = await forceDeleteUserService(targetUserId);
    res.status(200).json({ result });
  }
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.user._id.toString();
    const { currentPassword, newPassword } = req.body;

    const result = await changePasswordService(id, {
      currentPassword,
      newPassword,
    });

    res.status(200).json({ result });
  }
);
