import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  loginService,
  logoutService,
  registerService,
} from "../services/auth.service";

// Login controller
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.status(200).json({
    message: "Login successful",
    data: result,
  });
});

// Logout controller
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  await logoutService(token);
  res.status(200).json({ message: "Logout successful" });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  const result = await registerService(name, username, email, password);

  res.status(201).json({
    message: "User registered successfully",
    data: result,
  });
});
