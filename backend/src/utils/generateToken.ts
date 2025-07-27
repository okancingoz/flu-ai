import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: "user" | "admin"): string => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d", // Token will expire in 30 days
    }
  );
};
