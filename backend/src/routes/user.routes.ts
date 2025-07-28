import express from "express";
import {
  changePassword,
  deleteUser,
  forceDeleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

// Apply token verification middleware to all user routes
router.use(verifyToken);

// Admin-only route to get all users
router.route("/").get(getAllUsers);

// User-specific routes
router.route("/me").patch(updateUser).delete(deleteUser);

// Change password route
router.route("/change-password").post(changePassword);

// Get user by ID (admin or self)
router.route("/:id").get(getUserById).delete(forceDeleteUser);

export default router;
