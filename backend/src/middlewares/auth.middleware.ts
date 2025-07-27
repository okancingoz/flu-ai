import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import redisClient from "../config/redisClient";
import User from "../models/User";
import { AppError } from "../utils/AppError";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: string;
    }
  }
}

interface JWTPayload {
  id: string;
  email: string;
}

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const isBlacklisted = await redisClient.get(`bl_${token}`);
    if (isBlacklisted) {
      res.status(401).json({ message: "Not authorized, token is blacklisted" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JWTPayload;

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new AppError("User not found", 404));
    }

    req.token = token;

    next();
  }
);
