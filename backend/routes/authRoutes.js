import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { loginUser, getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);

export default router;
