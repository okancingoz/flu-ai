import { NextFunction, Request, RequestHandler, Response } from "express";

interface User {
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const adminOnly: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user as User; // veya: (req as AuthenticatedRequest).user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
