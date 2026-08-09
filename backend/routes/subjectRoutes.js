import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRole.js";

import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

// Create Subject
router.post(
  "/",
  authMiddleware,
  verifyRole("director", "teacher"),
  createSubject,
);

// Get All Subjects
router.get(
  "/",
  authMiddleware,
  verifyRole("director", "teacher"),
  getAllSubjects,
);

// Get Subject By ID
router.get(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  getSubjectById,
);

// Update Subject
router.put(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  updateSubject,
);

// Delete Subject
router.delete(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  deleteSubject,
);

export default router;
