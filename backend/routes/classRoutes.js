import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRole.js";

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";

const router = express.Router();

// ======================================================
// Create Class
// ======================================================

router.post("/", authMiddleware, verifyRole("director"), createClass);

// ======================================================
// Get All Classes
// ======================================================

router.get(
  "/",
  authMiddleware,
  verifyRole("director", "teacher"),
  getAllClasses,
);

// ======================================================
// Get Class By ID
// ======================================================

router.get(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  getClassById,
);

// ======================================================
// Update Class
// ======================================================

router.put("/:id", authMiddleware, verifyRole("director"), updateClass);

// ======================================================
// Delete Class
// ======================================================

router.delete("/:id", authMiddleware, verifyRole("director"), deleteClass);

export default router;
