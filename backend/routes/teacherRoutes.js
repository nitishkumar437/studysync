import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRole.js";

import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  assignSubjectsToTeacher,
  removeSubjectFromTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

// ======================================================
// Create Teacher
// ======================================================

router.post("/", authMiddleware, verifyRole("director"), createTeacher);

// ======================================================
// Get All Teachers
// ======================================================

router.get("/", authMiddleware, verifyRole("director"), getAllTeachers);

// ======================================================
// Get Teacher By ID
// ======================================================

router.get("/:id", authMiddleware, verifyRole("director"), getTeacherById);

// ======================================================
// Update Teacher
// ======================================================

router.put("/:id", authMiddleware, verifyRole("director"), updateTeacher);

// ======================================================
// Delete Teacher
// ======================================================

router.delete("/:id", authMiddleware, verifyRole("director"), deleteTeacher);

// ======================================================
// Assign Subjects To Teacher
// ======================================================

router.put(
  "/:id/subjects",
  authMiddleware,
  verifyRole("director", "teacher"),
  assignSubjectsToTeacher,
);

// ======================================================
// Remove Subject From Teacher
// ======================================================

router.delete(
  "/:id/subjects/:subjectId",
  authMiddleware,
  verifyRole("director", "teacher"),
  removeSubjectFromTeacher,
);

export default router;
