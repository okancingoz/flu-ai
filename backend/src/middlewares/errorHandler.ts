import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "production") {
    res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack,
      error: err,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
