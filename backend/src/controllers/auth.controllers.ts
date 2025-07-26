import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { loginService } from "../services/auth.service";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.status(200).json({
    message: "Login successful",
    data: result,
  });
});
