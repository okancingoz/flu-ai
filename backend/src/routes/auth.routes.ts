import express from "express";
import { login, logout, register } from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/register", register);

export default router;
