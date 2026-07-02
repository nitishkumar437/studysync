import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createTask,
  deleteTask,
  getTasks,
  toggleTaskStatus,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.patch("/:id/status", authMiddleware, toggleTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
