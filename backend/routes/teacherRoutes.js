import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// Create Teacher
router.post("/", authMiddleware, verifyRole("director"), createTeacher);

// Get All Teachers
router.get("/", authMiddleware, verifyRole("director"), getAllTeachers);

// Get Teacher By ID
router.get("/:id", authMiddleware, verifyRole("director"), getTeacherById);

router.put("/:id", authMiddleware, verifyRole("director"), updateTeacher);

router.delete("/:id", authMiddleware, verifyRole("director"), deleteTeacher);

export default router;
