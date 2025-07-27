import express from "express";
import { login, logout } from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
