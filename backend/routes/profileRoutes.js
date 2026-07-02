import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePhoto,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, updateProfile);

router.put("/change-password", authMiddleware, changePassword);

router.put(
  "/upload-photo",
  authMiddleware,
  upload.single("avatar"),
  uploadProfilePhoto,
);

export default router;
