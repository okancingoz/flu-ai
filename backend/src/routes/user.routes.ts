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
import { adminOnly } from "../middlewares/role.middleware";

const router = express.Router();

router.route("/")
  .get(verifyToken, adminOnly, getAllUsers);

router.route("/me")
  .patch(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

router.route("/change-password")
  .post(verifyToken, changePassword);

router.route("/:id")
  .get(verifyToken, getUserById)
  .delete(verifyToken, forceDeleteUser);

export default router;
