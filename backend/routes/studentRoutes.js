import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRole.js";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// Create Student
router.post(
  "/",
  authMiddleware,
  verifyRole("director", "teacher"),
  createStudent,
);

// Get All Students
router.get(
  "/",
  authMiddleware,
  verifyRole("director", "teacher"),
  getAllStudents,
);

// Get Student By ID
router.get(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  getStudentById,
);

// Update Student
router.put(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  updateStudent,
);

// Delete Student
router.delete(
  "/:id",
  authMiddleware,
  verifyRole("director", "teacher"),
  deleteStudent,
);

export default router;
