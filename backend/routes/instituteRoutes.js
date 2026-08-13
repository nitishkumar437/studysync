import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRole.js";
import upload from "../middleware/upload.js";
import {
  registerInstitute,
  getInstitute,
  updateInstitute,
} from "../controllers/instituteController.js";

const router = express.Router();

// ======================================================
// Register Institute
// Public Route
// ======================================================

router.post("/", registerInstitute);

// ======================================================
// Get Institute Settings
// Director Only
// ======================================================

router.get("/settings", authMiddleware, verifyRole("director"), getInstitute);

// ======================================================
// Update Institute Settings
// Director Only
// ======================================================

router.put(
  "/settings",
  authMiddleware,
  verifyRole("director"),
  upload.single("logo"),
  updateInstitute,
);

export default router;
