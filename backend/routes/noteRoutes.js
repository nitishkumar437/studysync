import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.delete("/:id", authMiddleware, deleteNote);
router.put("/:id", authMiddleware, updateNote);
export default router;
